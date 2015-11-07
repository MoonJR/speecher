(function () {
  'use strict';

  angular
      .module('myApp')
      .controller('detailController', detailController);

  detailController.$inject = ['$routeParams', 'scriptService', '$location'];
  function detailController($routeParams, scriptService, $location) {

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
            //console.log(response);
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

    // private functions
    function _errorHandler_ (error) {
      console.log(error);
      return { success: false, message: error };
    }
  }
})();

