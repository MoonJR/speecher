'use strict';

/**
 * Epic
 * 로그인 서비스는 사용자 정보를 서버로부터 받고 이를 저장하거나 삭제한다
 *
 * APIs
 * sendCredentials : 서버로 인증 정보를 보내면 사용자 정보를 반환한다
 * setCredentials : Base64 암호화된 사용자 정보를 http 헤더와 쿠키에 저장한다 - http 헤더와 쿠키를 감시
 * clearCredentials : window scope, http 헤더, 쿠키의 사용자 정보를 초기화한다
 */

describe('로그인 서비스는 사용자 정보를 서버로부터 받고 이를 저장하거나 삭제한다', function() {

  var loginService, httpBackend;
  var cookieStoreMock, httpHeaderMock, rootScopeMock;

  beforeEach(module('myApp'));

  beforeEach(inject(function ($injector, $cookieStore, $http, $rootScope) {
    loginService = $injector.get('loginService');
    httpBackend = $injector.get('$httpBackend');

    var response = { data: { email: 'jaisonoh@naver.com' }, success: 1 };

    httpBackend
        .when('GET', '/login/facebook')
        .respond(200, response);

    cookieStoreMock = $cookieStore;
    spyOn(cookieStoreMock, 'put');
    spyOn(cookieStoreMock, 'remove');

    httpHeaderMock = $http;
    rootScopeMock = $rootScope;
  }));

  it ('sendCredentials : 서버로 인증 정보를 보내면 사용자 정보를 반환한다', function () {
    loginService.sendCredentials('facebook', 'token', function (response) {
      expect(response.data.email).toBe('jaisonoh@naver.com');
      expect(response.success).toBe(1);
    });
  });

  it ('setCredentials : Base64 암호화된 사용자 정보를 http 헤더와 쿠키에 저장한다', function () {
    expect(cookieStoreMock.put).not.toHaveBeenCalled();
    expect(httpHeaderMock.defaults.headers.common.Authorization).toBeUndefined();

    // Behaviors After setCredentials()
    loginService.setCredentials('facebook', 'jaisonoh@naver.com');
    console.log(httpHeaderMock.defaults.headers.common.Authorization);

    expect(cookieStoreMock.put).toHaveBeenCalled();
    expect(httpHeaderMock.defaults.headers.common.Authorization).toBeDefined();
    /**
     * expect(cookieStoreMock.get('global')).toBeDefined(); 은 테스트가 안됨
     * beforeEach 블럭을 벗어나면 객체의 함수 내용이 사라지고 스텁만 남게 됨
     * 즉, beforeEach에서 더블된 Mock 객체의 함수들의 스코프는 beforeEach 블럭 내임
     */

  });

  it ('clearCredentials : window scope, http 헤더, 쿠키의 사용자 정보를 초기화한다', function () {
    loginService.setCredentials('facebook', 'jaisonoh@naver.com');
    expect(cookieStoreMock.put).toHaveBeenCalled();
    expect(httpHeaderMock.defaults.headers.common.Authorization).toEqual('Basic amFpc29ub2hAbmF2ZXIuY29t');

    // Behaviors After clearCredentials()
    loginService.clearCredentials();
    expect(cookieStoreMock.remove).toHaveBeenCalled();
    expect(httpHeaderMock.defaults.headers.common.Authorization).toBeDefined();
    expect(httpHeaderMock.defaults.headers.common.Authorization).toEqual('Basic ');
  })
});