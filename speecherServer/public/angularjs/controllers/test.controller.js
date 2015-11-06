(function () {
  'use strict';

  angular
    .module('myApp')
    .controller('testCtrl', testController);


  testController.$inject = ['$scope','$rootScope','$location' ,'$cookieStore', 'choiceService', 'scriptService'];
  function testController($scope, $rootScope, $location ,$cookieStore, choiceService, scriptService) {

    $rootScope.test = choiceService;
    $scope.startTest = startTest;
    $scope.finishTest = finishTest;

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
            $rootScope.test.script_content_blank = getBlankScript($rootScope.test.script_content);
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
      "maxResults": 2200,
      "continuous": true,
      "interimResults": true,
      "recognizing": true,
      "value":""
    }



    // Script 를  Blank화해서 저장한 후 보여준다  (구현중)
    function getBlankScript(script){
      var split = script.split(" ");
      var blank = "[         ]";
      for(var i = 0; i< split.length/10 ; i++){
        var random = Math.floor(Math.random() * split.length) + 1;
        if(split[random].length <= 3 || split[random] == blank){

        }else{
          split[random] = blank;
        }

      }
      return split.join(" ");
    }


    ////$rootScope.test.script =  test 의  script_content;
    //$rootScope.test.speech = $scope.speech;

    function startTest(){
      $rootScope.test.startTest();

    }

    function finishTest(){
      //$scope.speech.recognizing = false;
      $rootScope.test.finishTest();
    }


  }
})();










