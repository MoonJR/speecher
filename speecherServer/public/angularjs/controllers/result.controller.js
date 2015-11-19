(function () {
  'use strict';

  angular
    .module('myApp')
    .controller('resultController', resultController);

  resultController.$inject = ['$scope','$routeParams', 'testService','scriptService' , '$mdDialog','ngAudio','$compile'];
  function resultController($scope, $routeParams, testService, scriptService, $mdDialog, ngAudio, $compile) {

    var vm = this;
    vm.audio = ngAudio.load("uploads/f82dbce0-8b5b-11e5-9a85-1f37fe0c9e86.wav");


    // APIs
    vm.scriptId = { script_id : $routeParams.scriptId };
    vm.testResult = null;
    vm.testList = null;
    vm.wrongWordAll = null;
    vm.showTestResult = showTestResult;
    vm.showTestList = showTestList;
    vm.showWrongWordDialog = showWrongWordDialog;

    vm.selectResult = selectResult;

    vm.result = null;


    //vm.sound = ngAudio.load("sounds/mySound.wav");

    // init test result
    (function initController() {
      if(testService.testResult === null) {
        //showTestResult();
      } else {
        vm.testResult = testService.testResult;
        console.log(vm.testResult.script_result);
      }

      //showTestResult();
      showTestList();
      showWrongWordAll();
    })();

    function showTestResult () {
      testService.getTestResult(vm.scriptId).then(
        function (response) {
          console.log(response);
          if (response.data.success) {
            vm.testResult = response.data.result;
            vm.scriptTitle = response.data.result.script_title;
            vm.scriptContent = response.data.result.script_content;

          }
        },
        _errorHandler_('Error: showTestList')
      );
    }

    function showTestList () {
      testService.getTestList(vm.scriptId).then(
        function (response) {
          console.log(response);
          console.log("===================");
          console.log(response);
          if (response.data.success) {
            vm.testList = response.data.result;
            console.log("===================");
            console.log(response.data.result);
            console.log("===================");
          }
        },
        _errorHandler_('Error: showTestList')
      );
    }

    // private functions
    function _errorHandler_ (error) {
      console.log(error);
      return { success: false, message: error };
    }

    function showWrongWordAll() {
      console.log("is:::");
      console.log(vm.scriptId);
      var id = vm.scriptId;
      scriptService.getScriptWrongWord(id).then(
        function (response) {
          console.log(response);
          if(response.data.success) {
            if (response.data.result.length > 0) {
              vm.wrongWordAll = response.data.result;
              console.log("TESTER:");
              console.log(response.data);
            }
          }
          else {
            _errorHandler_('Error: success 0');
          }
        },
        _errorHandler_('Error: showWrongWordAll')
      );
    }

    function selectResult(item){
      vm.result = item;
      vm.audio = ngAudio.load("uploads/"+vm.result.recordFilename);
    }

    function showWrongWordDialog(item) {
      console.log("showWrongWordDialog(item)");
      var word = item._id.toLowerCase();
      //var pWord = {'word':word}
      var pWord = {'word':word}
      var proArr = "";
      scriptService.getWordDetail(pWord).then(
        function (response) {
          console.log(response);
          if(response.data.success) {
            var pros = null;
            var title = null;
            try{
              pros = response.data.result.pronunciation.all;
              if(pros == undefined) pros = response.data.result.pronunciation;
              title = word +"("+pros+")";
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


  }
})();

