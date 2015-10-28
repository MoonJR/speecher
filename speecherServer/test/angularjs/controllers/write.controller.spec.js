'use strict';

/**
 * Epic
 * 사용자가 불러온 대본이나 수정한 대본을 서버로 저장한다
 *
 * User Story
 * 1. 사용자 대본이 없으면 서버로 보내지 않는다
 * 2. 사용자가 작성한 대본을 서버로 저장한다
 * 3. 사용자가 불러온 대본을 수정해도 수정한 내용이 서버로 보내진다
 */

describe('사용자가 불러온 대본이나 수정한 대본을 서버로 저장한다', function () {

  var httpBackendMock;
  var rootScopeMock, scopeMock, writeControllerMock, httpMock;

  beforeEach(module('myApp'));

  beforeEach(inject(function (_$injector_, _$rootScope_, _$controller_, _$q_, _$http_) {
    httpBackendMock = _$injector_.get('$httpBackend');

    var response = { data: { success: 1  }};

    httpBackendMock
        .when('POST', '/main/scriptSave')
        .respond(200, response);

    rootScopeMock = _$rootScope_;
    scopeMock = _$rootScope_.$new();
    httpMock = _$http_;

    var deferred = _$q_.defer();
    deferred.resolve(response);

    writeControllerMock = _$controller_('writeController', {
      $rootScope: rootScopeMock,
      $scope: scopeMock,
      $http: httpMock
    });

    spyOn(httpMock, 'post').and.returnValue(deferred.promise);
  }));

  it ('1. 사용자 대본이 없으면 서버로 보내지 않는다', function () {
    writeControllerMock.saveScript();
    expect(httpMock.post).not.toHaveBeenCalled();

    // After add the script title and content
    scopeMock.title = 'test title1';
    scopeMock.content = 'test content1';
    writeControllerMock.saveScript();
    expect(httpMock.post).toHaveBeenCalled();
  });

  it ('2. 사용자가 작성한 대본을 서버로 저장한다', function () {

    scopeMock.title = 'test title2';
    scopeMock.content = 'test content2';
    console.log(writeControllerMock.response);

    writeControllerMock.saveScript();
    //httpBackendMock.flush();

    console.log(writeControllerMock.response);

    //expect(writeControllerMock.saveScript()).toBe();

    /**
     * 예상된 테스트 결과가 나오지 않고 있음
     * httpBackend에 대해 더 공부해야할 필요가 있을 듯
     */
  });
});
