'use strict';
angular
  .module('myApp')
  .controller('indexCtrl', indexCtrl);
indexCtrl.$inject = ['$scope','$rootScope', 'choiceService', '$location', '$http'];


function indexCtrl($scope, $rootScope, choiceService, $location,$http) {
  // 서버쪽 완성되면 요청해서 실데이터  ajax 매칭
  $scope.texts = {};
  $scope.words = {};

  //choice  view page 에 데이터 담아 이동하는 버튼 클릭리스너
  $scope.moveChoice = function($script_id){

    //id 만 넣었음 필요시 script_id 로 재요청하기
    choiceService.script_id = $script_id;

    $location.path('/choice');
  }

  /* AJAX 통신 처리 */
  _postModel('/main/scriptList',callbackTexts)
  //api  완성되면 활성화
  //_postModel('/main/totalFailList',callbackWords)

  //api  완성되면 비활성화
  $scope.words = [
    {
      id: '1',
      word: 'Must',
      count: '5'
    }, {
      id: '2',
      word: 'Should',
      count: '4'
    }
  ];


  $scope.showWordDlg = function(content) {
    $mdDialog.show(
      $mdDialog.alert()
        .clickOutsideToClose(true)
        .title("DetailWord")
        .content(content)
        .ariaLabel(content)
        .ok('Close')
    );
  };



  function _postModel(url,callback){
    $http({
      method: 'POST', //방식
      url: url, /* 통신할 URL */
      headers: {'Content-Type': 'application/json; charset=utf-8'} //헤더
    })
      .success(callback)
      .error(function(data, status) {
        /* 서버와의 연결이 정상적이지 않을 때 처리 */
        console.log(status);
        alert("네트워크 오류가 발생했습니다. error code:"+status);
      });
  }



  // 텍스트 요청 콜백
  function callbackTexts(data) {
    if(data) {
      if(data['success']==1){
        $scope.texts = data['result'];
      }else{
      }
      /* 성공적으로 결과 데이터가 넘어 왔을 때 처리 */
    }
    else {
      /* 통신한 URL에서 데이터가 넘어오지 않았을 때 처리 */
      alert("대본 불러오기 중 데이터가 넘어오지 않습니다.");
    }
  }

  //워드 요청 콜백
  function callbackWords(data) {
    if(data) {
      if(data['success']==1){
        $scope.words = data['result'];
      }else{
      }
      /* 성공적으로 결과 데이터가 넘어 왔을 때 처리 */
    }
    else {
      /* 통신한 URL에서 데이터가 넘어오지 않았을 때 처리 */
      alert("자주 틀린 단어 불러오기 중 데이터가 넘어오지 않습니다.");
    }
  }
};


