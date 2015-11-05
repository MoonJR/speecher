(function () {
  'use strict';

  angular
      .module('myApp')
      .controller('detailController', detailController);

  detailController.$inject = ['$http', '$routeParams', 'scriptService'];
  function detailController($http, $routeParams, scriptService) {

    var vm = this;

    // APIs
    vm.scriptId = { script_id : $routeParams.scriptId };
    vm.scriptTitle = null;
    vm.scriptContent = null;
    vm.showScript = showScript;

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
            else {
              _errorHandler_('Error: success 0');
            }
          },
          _errorHandler_('Error: showScript')
      );
    }


    // private functions

    function _successHandler_(response) {
      if(response.data.success) {
        console.log(response);
        return response;
      } else {
        _errorHandler_('Error: success 0');
      }
    }

    function _errorHandler_ (error) {
      return { success: false, message: error };
    }
  }
})();

