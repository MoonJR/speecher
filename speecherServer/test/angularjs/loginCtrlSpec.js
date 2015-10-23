'use strict';

describe('로그인 테스트', function () {

  var loginCtrl, scope, facebook;

  // loginCtrl 컨트롤러의 모듈 로딩
  beforeEach(module('myApp'));

  // loginCtrl 컨트롤러 초기화
  beforeEach(inject(function ($controller, $rootScope, $facebook) {
    scope = $rootScope.$new();
    loginCtrl = $controller('loginCtrl', {
      $scope: scope
    });
    facebook = $facebook
  }));

  it('처음 방문자는 로그인이 안 되어있다.', function () {
    expect(scope.isLoggedIn).toBe(false);
  });

  // spy issue
  it('로그인을 버튼을 누르면 $facebook 객체가 호출된다', function () {
    var login = scope.login();
    spyOn(facebook, "getLoginStatus").andCallFake(function (callback) {
        callback(
          {
            status: 'connected',
            authResponse: {accessToken : 'access_token'}
          }
        );
    });
    //spyOn(scope, login)
    //scope.login();
    //expect().toHaveBeenCalled();
  });

  /*
  it('로그인을 하면 isLoggedIn이 true가 된다', function () {
    scope.isLoggedIn = true;
    expect(scope.isLoggedIn).toBe(true);
  });*/
});
