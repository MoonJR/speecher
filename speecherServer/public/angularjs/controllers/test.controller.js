(function () {
  'use strict';

  angular
      .module('myApp')
      .controller('testCtrl', testController);


  testController.$inject = ['$scope','$rootScope', '$filter', '$location' ,'$cookieStore', 'choiceService', 'scriptService', 'testService'];
  function testController($scope, $rootScope, $filter, $location ,$cookieStore, choiceService, scriptService, testService) {

    $rootScope.test = choiceService;

    (function initController() {
      var testCookie = $cookieStore.get('test');
      choiceService.saveItem(testCookie);
      $rootScope.test = testCookie;

    })();

    $scope.speech = {
      "maxResults": 3000,
      "continuous": true,
      "interimResults": true,
      "recognizing": false,
      "value":""
    }

    //$rootScope.test.script =  test 의  script_content;
    $rootScope.test.speech = '';
    $rootScope.test.interSpeech = $scope.speech['interimResults'];



    // Made by Sojin

    var vm = this;

    // APIs
    vm.testInfo = $rootScope.test;
    vm.scriptId = $rootScope.test.script_id;
    vm.scriptResult = null;
    vm.testType = $rootScope.test.type;
    vm.testTime = $rootScope.test.counter;
    vm.testId = 123;

    vm.saveTestResult = saveTestResult;


    function saveTestResult() {

      vm.scriptResult = $filter('diffFilter')($scope.speech.value, $rootScope.test.script_content);
      console.log(vm.scriptResult);
      //console.log($scope.speech.value);
      //console.log($rootScope.test.script_content);

      var testResult = {
        script_id: vm.scriptId,
        script_result : vm.scriptResult,
        test_type: vm.testType,
        test_time: vm.testTime,
        test_id: vm.testId
      };

      testService.saveTestResult(testResult).then(
          function (response) {
            if (response.data.success) {
              console.log(response);
            }
            else {
              _errorHandler_('Error: success 0');
            }
          },
          _errorHandler_('Error: saveTestResult')
      );
    }

    // private functions
    function _errorHandler_(error) {
      return { success: false, message: error };
    }
  }
})();
