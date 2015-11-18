(function () {
  'use strict';

  angular
      .module('myApp')
      .controller('detailController', detailController);

  detailController.$inject = ['$routeParams', 'scriptService', '$location', 'choiceService', '$mdDialog'];
  function detailController($routeParams, scriptService, $location, choiceService, $mdDialog) {

    var vm = this;

    // APIs
    vm.scriptId = { script_id : $routeParams.scriptId };
    vm.scriptTitle = null;
    vm.scriptContent = null;
    vm.scriptIsModifing = false;
    vm.wrongWord = null;
    vm.showScript = showScript;
    vm.showWrongWord = showWrongWord;
    vm.showWrongWordAll = showWrongWordAll;
    vm.modifyScript = modifyScript;
    vm.saveScript = saveScript;
    vm.deleteScript = deleteScript;
    vm.moveChoice = moveChoice;
    vm.showWrongWordDialog = showWrongWordDialog;
    // init script title & content
    (function initController() {
      showScript();
      showWrongWord();
      showWrongWordAll();
    })();

    function showScript() {
      scriptService.getScript(vm.scriptId).then(
          function (response) {
            if (response.data.success) {
              vm.scriptTitle = response.data.result.script_title;
              vm.scriptContent = response.data.result.script_content;
              //console.log(response.data.result);
            }
          },
          _errorHandler_('Error: showScript')
      );
    }

    function showWrongWord() {
      scriptService.getWrongWordAll(vm.scriptId).then(
          function (response) {
            console.log(response);
            if(response.data.success) {
              vm.wrongWord = response.data.result;
            }
            else {
              _errorHandler_('Error: success 0');
            }
          },
          _errorHandler_('Error: showWrongWordAll')
      );
    }

    function showWrongWordAll() {
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

    function modifyScript(boolean) {
      vm.scriptIsModifing = boolean;
    }

    function saveScript() {
      var data = {
        title: vm.scriptTitle,
        content: vm.scriptContent
      };

      scriptService.saveScript(data).then(
          function (response) {
            console.log(response.data);
            if (response.data.success) {
              deleteScript();
            }
          },
          _errorHandler_('Error: saveScript')
      );
    }

    function deleteScript() {
      scriptService.deleteScript(vm.scriptId).then(
          function (response) {
            if (response.data.success) {
              console.log(response);
              $location.path('/#/index');
            }
          },
          _errorHandler_('Error: deleteScript')
      );
    }

    // checking current selected test`s infomation and data
    function moveChoice(){
      var scriptData = {
        script_id : vm.scriptId,
        script_title : vm.scriptTitle,
        script_content : vm.scriptContent
      };

      //console.log("MOVE ID:"+scriptData["id"]);
      choiceService.saveItem(scriptData);
      $location.path('/choice');
    }

    // private functions
    function _errorHandler_ (error) {
      return { success: false, message: error };
    }
  }
})();

