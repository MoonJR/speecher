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
    })();

    $scope.speech = {
      "maxResults": 25,
      "continuous": true,
      "interimResults": true,
      "recognizing": false
    }

    $rootScope.test.script = 'loaded text';
    $rootScope.test.speech = '';
    $rootScope.test.interSpeech = $scope.speech['interimResults'];

  }
})();










