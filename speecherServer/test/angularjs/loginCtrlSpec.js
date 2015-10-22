'use strict';

describe('로그인 테스트', function () {

  var loginCtrl, scope;

  // loginCtrl 컨트롤러의 모듈 로딩
  beforeEach(module('myApp'));

  // loginCtrl 컨트롤러 초기화
  beforeEach(inject(function ($controller) {
    scope = {};
    loginCtrl = $controller('loginCtrl', {
      $scope: scope
    });
  }));

  it('처음 방문자는 로그인이 안 되어있다.', function () {
    expect(false).toBe(false);
  });
});
