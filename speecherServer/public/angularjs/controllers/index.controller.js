(function () {
  'use strict';

  angular
    .module('myApp')
    .controller('indexController', indexController);

  indexController.$inject = ['$rootScope', '$mdDialog','$location' ,'scriptService','choiceService','$http'];
  function indexController($rootScope, $mdDialog, $location, scriptService, choiceService, $http) {
    var vm = this;

    // APIs
    vm.test = choiceService;
    vm.location = $location;
    vm.scriptList = null;
    vm.wrongWordAll = null;
    vm.showScriptList = showScriptList;
    vm.showWrongWordAll = showWrongWordAll;
    vm.showWrongWordDialog = showWrongWordDialog;

    // UI handle
    vm.number = 0;
    vm.score = 30;

    // init script list & words
    (function initController() {
      vm.test.timer_status = true;
      showScriptList();
      showWrongWordAll();
    })();

    function showScriptList(){
      scriptService.getScriptList().then(
        function (response) {
          if (response.data.success) {
            //console.log(response.data);
            if (response.data.result.length > 0) {
              vm.scriptList = response.data.result;
              //console.log(response.data.result);
             }
            //console.log(response);
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
          //console.log(response);
          if(response.data.success) {
            if (response.data.result.length > 0) {
              vm.wrongWordAll = response.data.result;
              //console.log(vm.wrongWordAll[0]._id);
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
      var word = item._id.toLowerCase();
      //var pWord = {'word':word}
      var pWord = {'word':word}
      var proArr = "";
      scriptService.getWordDetail(pWord).then(
        function (response) {

          if(response.data.success) {
            var title = "";
            var pros = "";
            try{
              pros = response.data.result.pronunciation.all;
              if(pros == undefined) pros = response.data.result.pronunciation;
              title = word +"("+pros+")"
            }catch(e){
              title = word;
            }

            $mdDialog.show(
              $mdDialog.alert()
                .clickOutsideToClose(true)
                .title(title)
                .content(
                '<button class="play btn right md-primary md-button" value="'+word+'"><img src="../images/icon_play.png" style="margin:9px"></button> <input type="text" class="repeat  hidden" value="3" maxlength="1"/>')
                .ok('닫기')
            );

          }
          else {
            _errorHandler_('Error: success 0');
          }
        },
        _errorHandler_('Error: showWrongWordAll')
      );
    }

    // private functions
    function _errorHandler_(error) {
      //console.log(error);
      return { success: false, message: error };
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
            );

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
