(function () {
  'use strict';

  angular
    .module('myApp')
    .controller('testCtrl', testController);


  testController.$inject = ['$scope','$rootScope','$location' ,'$cookieStore', 'choiceService', 'scriptService'];
  function testController($scope, $rootScope, $location ,$cookieStore, choiceService, scriptService) {

    $rootScope.test = choiceService;
    (function initController() {
      var testCookie = $cookieStore.get('test');
      choiceService.saveItem(testCookie);

      //$rootScope.test = testCookie;

      scriptService.getScript({script_id:$rootScope.test.script_id}).then(
        function (response) {
          if (response.data.success) {
            console.log("response.data.result");
            console.log(response.data.result);
            //if (response.data.result.length > 0) {
            $rootScope.test.script_content = response.data.result.script_content;
            //}
            console.log(response);
          }
          else {
            _errorHandler_('Error: success 0');
          }
        },
        function () {
        }
      );
    })();

    $scope.speech = {
      "maxResults": 3000,
      "continuous": true,
      "interimResults": true,
      "recognizing": false,
      "value":""
    }



    //$rootScope.test.script =  test 의  script_content;
    $rootScope.test.speech = $scope.speech;
  }
})();










