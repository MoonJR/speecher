(function () {
  'use strict';

  angular
    .module('myApp')
    .factory('choiceService', choiceService);

  choiceService.$inject = ['$http', '$cookieStore', '$rootScope'];
  function choiceService($http, $cookieStore, $rootScope) {
    var test = {};

    //default data
    test = {

    }

    //function
    test.addTimer = addTimer;
    test.saveItem = saveItem;

    return test;

    function addTimer(min){
      if(choiceService.timer_value < 0){
        choiceService.timer_value = 0;
      } else{
        choiceService.timer_value += min;
      }
      choiceService.timer_seconds = choiceService.timer_value * 60;
      choiceService.timer_percent = choiceService.current_seconds/choiceService.timer_seconds;
    }

    function saveItem(item){
      for (var key in item) {
        if (item.hasOwnProperty(key)) {
          var obj = item[key];
          //console.log(key+","+obj);
          test[key] = obj;
        }
      }
    }
  }

})();
