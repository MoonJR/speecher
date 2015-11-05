'use strict';

/**
 * Epic
 * 스크립트 서비스는 스크립트를 저장하고 스크립트와 틀린 단어 정보를 가져온다
 *
 * APIs
 * saveScript : 스크립트를 저장한다
 * getScript : scriptId와 일치하는 스크립트를 가져온다
 * getWrongWord : scriptId와 일치하는 틀린 단어 목록을 가져온다
 * getScriptList : 스크립트 전체 리스트를 가져온다
 * getWrongWordAll : 전체 틀린 단어 목록을 가져온다
 */

describe('스크립트 서비스는 스크립트를 저장하고 스크립트와 틀린 단어 정보를 가져온다', function() {

  var scriptServiceMock, httpMock, httpBackendMock;
  var response = { data: {}, success: 1 };

  beforeEach(module('myApp'));

  beforeEach(inject(function (_$injector_, _$http_, _$q_) {
    httpMock = _$http_;

    var deferred = _$q_.defer();
    deferred.resolve('success');

    spyOn(httpMock, 'post').and.returnValue(deferred.promise);

    scriptServiceMock = _$injector_.get('scriptService', {
      $http: httpMock
    });

    httpBackendMock = _$injector_.get('$httpBackend');

    httpBackendMock
        .when('POST', '/main/scriptSave')
        .respond(200, response);
  }));

  it ('saveScript : 스크립트를 저장한다', function () {
    var script = {
      title : 'test title',
      content : 'test content'
    };

    scriptServiceMock.saveScript(script);
    expect(httpMock.post).toHaveBeenCalled();
  });

  it ('getScript : scriptId와 일치하는 스크립트를 가져온다', function () {
    var scriptId = '0';

    scriptServiceMock.getScript(scriptId);
    expect(httpMock.post).toHaveBeenCalled();
  });

  it ('getWrongWord : scriptId와 일치하는 틀린 단어 목록을 가져온다', function () {
    var scriptId = '0';

    scriptServiceMock.getWrongWord(scriptId);
    expect(httpMock.post).toHaveBeenCalled();
  });

  it ('getScriptList : 스크립트 전체 리스트를 가져온다', function () {
    scriptServiceMock.getScriptList();
    expect(httpMock.post).toHaveBeenCalled();
  });

  it ('getWrongWordAll : 전체 틀린 단어 목록을 가져온다', function () {
    scriptServiceMock.getWrongWordAll();
    expect(httpMock.post).toHaveBeenCalled();
  });
});