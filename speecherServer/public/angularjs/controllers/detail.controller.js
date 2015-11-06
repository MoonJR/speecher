(function () {
  'use strict';

  angular
      .module('myApp')
      .controller('detailController', detailController);

  detailController.$inject = ['$http', '$routeParams', 'scriptService', '$location'];
  function detailController($http, $routeParams, scriptService, $location) {

    var vm = this;

    // APIs
    vm.scriptId = { script_id : $routeParams.scriptId };
    vm.scriptTitle = null;
    vm.scriptContent = null;
    vm.scriptIsModifing = false;
    vm.showScript = showScript;
    vm.modifyScript = modifyScript;
    vm.saveScript = saveScript;
    vm.deleteScript = deleteScript;

    vm.wordsDummy = [
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

    // init script title & content
    (function initController() {
      showScript();
    })();

    function showScript() {
      scriptService.getScript(vm.scriptId).then(
          function (response) {
            if (response.data.success) {
              vm.scriptTitle = response.data.result.script_title;
              vm.scriptContent = response.data.result.script_content;

              console.log(response.data.result);
            }
          },
          _errorHandler_('Error: showScript')
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
      return { success: false, message: error };
    }
  }
})();

