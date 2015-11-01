(function () {
  'use strict';

  angular
    .module('myApp')
    .factory('choiceService', choiceService);

  choiceService.$inject = ['$http', '$cookieStore', '$rootScope'];
  function choiceService($http, $cookieStore, $rootScope) {
    var test = {};
    //default timer counter
    test.counter = 5;

    test = $cookieStore.get('test');

    //function
    test.addTimer = addTimer;
    test.saveItem = saveItem;
    test.setTimer = setTimer;


    return test;

    function addTimer(min){
      if(test.timer_value < 0){
        test.timer_value = 0;
      } else{
        test.timer_value += min;
      }
      test.timer_seconds = test.timer_value * 60;
      test.timer_percent = test.current_seconds/test.timer_seconds;
    }

    function saveItem(item){
      for (var key in item) {
        if (item.hasOwnProperty(key)) {
          var obj = item[key];
          //console.log(key+","+obj);
          test[key] = obj;
        }
      }
      $cookieStore.put('test', $rootScope.test);
    }

    function setTimer($min,$type){
      if($rootScope.test.counter < 1){
        $rootScope.test.counter = 1;
      } else if($type == 'add'){
        $rootScope.test.counter += $min;
      } else if($type == 'set'){
        $rootScope.test.counter = $min;
      }
      $rootScope.test.timer_seconds = $rootScope.test.timer_value * 60;
      $rootScope.test.timer_percent = $rootScope.test.current_seconds/$rootScope.test.timer_seconds;
    }
  }

})();
