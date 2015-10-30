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
      script_title: 'Example Title',
      point: '84',
      script_content: " I'll be in your neighborhood doing errands",
      reg_date: 2015/11/19,
    }
    return test;
  }




})();
