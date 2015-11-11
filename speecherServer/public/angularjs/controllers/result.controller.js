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
    vm.testResult = null;
    vm.testList = null;
    vm.showTestResult = showTestResult;
    vm.showTestList = showTestList;

    // init test result
    (function initController() {
      if(testService.testResult === null) {
        //showTestResult();
      } else {
        vm.testResult = testService.testResult;
        console.log(vm.testResult.script_result);
      }
      showTestResult();
      showTestList();
    })();

    function showTestResult () {
      testService.getTestResult(vm.scriptId).then(
          function (response) {
            console.log(response);
            if (response.data.success) {
              vm.testResult = response.data.result;
            }
          },
          _errorHandler_('Error: showTestList')
      );
    }

    function showTestList () {
      testService.getTestList(vm.scriptId).then(
          function (response) {
            console.log(response);
            if (response.data.success) {
              vm.testList = response.data.result;
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

