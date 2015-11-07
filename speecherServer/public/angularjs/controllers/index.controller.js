(function () {
  'use strict';

  angular
    .module('myApp')
    .controller('indexController', indexController);

  indexController.$inject = ['$rootScope', '$mdDialog','$location' ,'scriptService','choiceService','$http'];
  function indexController($rootScope, $mdDialog, $location, scriptService, choiceService, $http) {
    var vm = this;
    // APIs
    vm.scriptList = null;
    vm.wrongWordAll = null;
    vm.showScriptList = showScriptList;
    vm.showWrongWordAll = showWrongWordAll;
    vm.showWrongWordDialog = showWrongWordDialog;




    // init script list & words
    (function initController() {
      showScriptList();
      showWrongWordAll();

      vm.wrongWordAll = [
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


    })();

    function showScriptList(){
      scriptService.getScriptList().then(
        function (response) {
          if (response.data.success) {
            console.log(response.data);
            if (response.data.result.length > 0) {
              vm.scriptList = response.data.result;
              console.log(response.data.result);
             }
            console.log(response);
          }
          else {
            _errorHandler_('Error: success 0');
          }
        },
        _errorHandler_('Error: showScriptList')

      );
    }
    function showWrongWordAll() {
      scriptService.getWrongWordAll().then(
        function (response) {
          console.log(response);
          if(response.data.success) {
            if (response.data.result.length > 0) {
              vm.wrongWordAll = response.data.result;
              console.log(vm.wrongWordAll[0]._id);
            }
          }
          else {
            _errorHandler_('Error: success 0');
          }
        },
        _errorHandler_('Error: showWrongWordAll')
      );
    }

    function showWrongWordDialog(item) {
      var word = item.word.toLowerCase();;
      $mdDialog.show(
        $mdDialog.alert()
          .clickOutsideToClose(true)
          .title("틀린단어 상세보기")
          .content(word +"<br>"+
          '<audio src="https://translate.google.com/translate_tts?ie=UTF-8&q='+word+'&tl=en" controls></audio>')
          .ariaLabel("")
          .ok('Close')
      );
    }

    function DialogController($scope, $mdDialog) {
      $scope.hide = function() {
        $mdDialog.hide();
      };
      $scope.cancel = function() {
        $mdDialog.cancel();
      };
      $scope.answer = function(answer) {
        $mdDialog.hide(answer);
      };
    }


    // private functions
    function _errorHandler_(error) {
      console.log(error);
      return { success: false, message: error };
    }


    // 코드리뷰 검토 후 선언과 초기화  상하단으로 분리하겠음
    // index 단에서부터 test data 를 가지고 있어야 할 것 같음

    vm.moveChoice = moveChoice;
    // checking current selected test`s infomation and data
    function moveChoice(scriptData){
      console.log("MOVE ID:"+scriptData["id"]);
      choiceService.saveItem(scriptData);
      $location.path('/choice');
    }


    // 단어 데이터 받아온 후에, 다이얼로그 보여준다
    $rootScope.showAlert = function(item) {

      $http.post('/main/wordDetail', {word:item.word}).then(
        function (response){

          if(response.data.success){
            console.log("get word data");

            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title(item.word+"("+item.count+")")
                .content('발음기호:'+ response.data.result.pronunciation.all)
                .ok('닫기')

            )

            return response;
          } else {
            _errorHandler_('Error: detailWord success 0');
          }
        },
        _errorHandler_('Error: detailWord')
      );


    };




  }

})();
