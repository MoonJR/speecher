(function () {
  'use strict';

  angular
    .module('myApp')
    .factory('choiceService', choiceService);

  choiceService.$inject = ['$http', '$cookieStore', '$rootScope'];
  function choiceService($http, $cookieStore, $rootScope) {
    var test = {};
    test = {
      script_id: '0',
      timer_status:true,
      timer_value:5,
      timer_seconds:300,
      current_seconds:1,
      timer_percent:0,
      script_title: 'Example Title',
      point: '84',
      script_content: " I'll be in your neighborhood doing errands",
      reg_date: 2015/11/19,
      //add_timer: _addTimer,
    }
    return test;

    //function _addTimer($min){
    //  if(choiceService.timer_value < 0){
    //    choiceService.timer_value = 0;
    //  } else{
    //    choiceService.timer_value += $min;
    //  }
    //  choiceService.timer_seconds = choiceService.timer_value * 60;
    //  choiceService.timer_percent = choiceService.current_seconds/choiceService.timer_seconds;
    //}
  }




})();
