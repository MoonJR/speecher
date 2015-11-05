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
      $rootScope.test.test
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

  }
})();










