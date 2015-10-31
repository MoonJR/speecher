/**
 * Created by jaisonoh on 2015. 10. 28..
 */

/**
 * Epic
 * 사용자는 파일 선택 버튼을 눌러 텍스트 파일을 선택하면 파일 이름과 내용을 가져올 수 있다
 *
 * User Story
 * 1. 사용자가 대본작성 페이지에 들어가면 대본 제목과 내용이 초기화 되어있다
 * 2. 사용자는 파일 선택 버튼을 누르면 파일 선택 창이 나온다 - input file type 속성
 * 3. 사용자가 파일을 선택하면 그 파일 이름, 내용을 대본 제목, 내용으로 갖고 온다
 * 4. 사용자가 다른 파일을 갖고 오면 그 파일의 내용이 갱신된다
 */

describe('사용자는 파일 선택 버튼을 눌러 텍스트 파일을 선택하면 파일 이름과 내용을 가져올 수 있다', function() {

  var rootScopeMock, scopeMock, compileMock, locationMock, browserMock;
  var writeControllerMock;

  beforeEach(module('myApp'));

  beforeEach(inject(function (_$rootScope_, _$controller_, _$location_, _$browser_, _$compile_) {
    rootScopeMock = _$rootScope_;
    scopeMock = _$rootScope_.$new();
    compileMock = _$compile_;
    locationMock = _$location_;
    browserMock = _$browser_;

    writeControllerMock = _$controller_('writeController', {
      $scope: scopeMock
    });
  }));

  it ('1. 사용자가 대본작성 페이지에 들어가면 대본 제목과 내용이 정의되어 있지 않다', function () {
    locationMock.path('/write');
    expect(scopeMock.title).toBeUndefined();
    expect(scopeMock.content).toBeUndefined();

    // 파일을 읽은 후에는 대본 제목과 내용이 생성된다
    var fileStub = { title: 'title', content: 'content' };
    scopeMock.readScript(fileStub);
    expect(scopeMock.title).toEqual('title');
    expect(scopeMock.content).toEqual('content');
  });

  it ('3. 사용자가 파일을 선택하면 그 파일 이름, 내용을 대본 제목, 내용으로 갖고 온다', function () {

    spyOn(scopeMock, 'readScript');

    // ng-read-file directive piece
    var element = compileMock(angular.element('<input type="file" ng-file-read="readFile($file)">'))(scopeMock);
    scopeMock.$digest();

    // onchange event
    var onChangeEvent = $.Event('change', {});
    element.triggerHandler(onChangeEvent);

    //Dummy file load
    //expect(scopeMock.readFile()).toHaveBeenCalled();
  });

  it ('4. 사용자가 다른 파일을 갖고 오면 그 파일의 내용이 갱신된다', function () {

  });
});