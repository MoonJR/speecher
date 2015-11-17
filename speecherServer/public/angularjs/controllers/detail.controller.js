(function () {
  'use strict';

  angular
      .module('myApp')
      .controller('detailController', detailController);

  detailController.$inject = ['$routeParams', 'scriptService', '$location', 'choiceService'];
  function detailController($routeParams, scriptService, $location, choiceService) {

    var vm = this;

    // APIs
    vm.scriptId = { script_id : $routeParams.scriptId };
    vm.scriptTitle = null;
    vm.scriptContent = null;
    vm.scriptIsModifing = false;
    vm.wrongWord = null;
    vm.showScript = showScript;
    vm.showWrongWord = showWrongWord;
    vm.modifyScript = modifyScript;
    vm.saveScript = saveScript;
    vm.deleteScript = deleteScript;
    vm.moveChoice = moveChoice;

    // init script title & content
    (function initController() {
      showScript();
      showWrongWord();
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

