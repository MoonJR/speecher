//'use strict';
//
////Epic
////사용자는 SNS 계정 사용하여 로그인 할 수 있다.
//
////User Story
////0. 사용자가 로그인 하지 않은 상태면 로그인 단추를 표시한다.
////1. 사용자는 구글 계정을 사용하여 로그인 할 수 있다
////2. 사용자는 페이스북 계정을 사용하여 로그인 할 수 있다
////3. 사용자가 존재하지 않은 계정을 사용하면 로그인 할 수 없다.
////4. 사용자가 틀린 암호를 입력하면 로그인 할 수 없다.
//
//describe('로그인 테스트', function () {
//
//  var loginCtrl, scope, facebook;
//
//  // loginCtrl 컨트롤러의 모듈 로딩
//  beforeEach(module('myApp'));
//
//  // loginCtrl 컨트롤러 초기화
//  beforeEach(inject(function ($controller, $rootScope, $facebook, $q) {
//    scope = $rootScope.$new();
//    loginCtrl = $controller('loginCtrl', {
//      $scope: scope
//    });
//    facebook = $facebook;
//
//    //var deferred = $q.defer();
//    //deferred.resolve('refresh()');
//    //spyOn(facebook, 'login').andReturn(deferred.promise);
//  }));
//
//  it('처음 방문자는 로그인이 안 되어있다.', function () {
//    expect(scope.isLoggedIn).toBe(false);
//  });
//
//  it ('1. 사용자는 구글 계정을 사용하여 로그인 할 수 있다', function () {
//
//  });
//
//  it ('2. 사용자는 페이스북 계정을 사용하여 로그인 할 수 있다 ', function () {
//
//  });
//
//  it ('3. 사용자가 존재하지 않은 계정을 사용하면 로그인 할 수 없다.', function () {
//
//  });
//
///*
//  // spy issue
//  it('로그인을 버튼을 누르면 $facebook 객체의 login 메서드가 실행된다', function () {
//
//    // undefined error
//    //spyOn(facebook, "getLoginStatus").andCallFake(function (callback) {
//    //    callback(
//    //      {
//    //        status: 'connected',
//    //        authResponse: {accessToken : 'access_token'}
//    //      }
//    //    );
//    //});
//
//    // 프라미스 문제
//    scope.login();
//    expect(facebook.login).toHaveBeenCalled();
//  });
//*/
//  // it('프라미스를 테스트해보자', function () {
//  //   scope.login();
//  //   scope.$apply();
//  //   expect(facebook.login).toHaveBeenCalled();
//  // });
//
//  /*
//  it('로그인을 하면 isLoggedIn이 true가 된다', function () {
//    scope.isLoggedIn = true;
//    expect(scope.isLoggedIn).toBe(true);
//  });*/
//});
