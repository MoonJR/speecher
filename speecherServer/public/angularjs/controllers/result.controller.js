(function () {
  'use strict';

  angular
      .module('myApp')
      .controller('resultController', resultController);

  resultController.$inject = ['$routeParams', 'testService'];
  function resultController($routeParams, testService) {

    var vm = this;

    // APIs
    vm.scriptId = { script_id : $routeParams.scriptId };

    vm.showTestList = showTestList;

    // init test result
    (function initController() {
      showTestList();
    })();

    function showTestList () {
      testService.getTestList(vm.scriptId).then(
          function (response) {
            console.log(response);
            if (response.data.success) {
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

  }
})();

