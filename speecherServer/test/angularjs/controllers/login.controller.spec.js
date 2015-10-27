'use strict';

/**
 * Epic
 * 사용자는 SNS 계정 사용하여 로그인 할 수 있다
 *
 * User Story
 * 1. 사용자가 로그인 하지 않은 상태면 로그인 단추를 표시한다 - Routing과 함께 E2E테스트로
 * 2. 사용자는 페이스북 계정을 사용하여 로그인 할 수 있다
 * 3. 사용자는 구글 계정을 사용하여 로그인 할 수 있다
 * 4. 사용자가 존재하지 않은 계정을 사용하면 로그인 할 수 없다
 * 5. 사용자가 틀린 암호를 입력하면 로그인 할 수 없다
 * 6. 사용자가 로그인하면 다른 페이지로 전환된다 - $location 객체 호출
 */

describe('사용자는 SNS 계정 사용하여 로그인 할 수 있다', function () {

  var rootScopeMock, loginControllerMock, loginServiceMock, locationMock;
  var facebookMock, googleMock;


  beforeEach(module('myApp'));

  beforeEach(inject(function (_$rootScope_, _$controller_, _$q_, _$facebook_,
                              _GooglePlus_, _loginService_, _$location_) {

    rootScopeMock = _$rootScope_;
    facebookMock = _$facebook_;
    googleMock = _GooglePlus_;
    loginServiceMock = _loginService_;
    locationMock = _$location_;

    var deferred = _$q_.defer();
    deferred.resolve('success');

    spyOn(facebookMock, 'login').and.returnValue(deferred.promise);
    spyOn(facebookMock, 'getLoginStatus').and.returnValue(deferred.promise);
    spyOn(googleMock, 'login').and.returnValue(deferred.promise);

    loginControllerMock = _$controller_('loginController', {
      $rootScope: rootScopeMock,
      $facebook: facebookMock,
      GooglePlus: googleMock,
      loginService: loginServiceMock,
      $location: locationMock
    });
  }));

  it ('2. 사용자는 페이스북 계정을 사용하여 로그인 할 수 있다', function () {
    loginControllerMock.facebookLogin();
    expect(facebookMock.login).toHaveBeenCalled();

    /**
     * expect(facebookMock.getLoginStatus()).toHaveBeenCalled(); 은 error
     * facebookMock.login에서 올바른 응답이 리턴되어야 하지만
     * 이는 페이스북 서버와의 인증이 필요하므로 아직 Mock 구현이 안됨
     */
  });

  it ('3. 사용자는 구글 계정을 사용하여 로그인 할 수 있다', function () {
    loginControllerMock.googleLogin();
    expect(googleMock.login).toHaveBeenCalled();
  });
});
