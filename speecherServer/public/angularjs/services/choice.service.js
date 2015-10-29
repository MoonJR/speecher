(function () {
  'use strict';

  angular
    .module('myApp')
    .factory('choiceService', choiceService);

  choiceService.$inject = ['$http', '$cookieStore', '$rootScope'];
  function choiceService($http, $cookieStore, $rootScope) {

    var test = {};
    test = {
      id: '1',
      title: 'Brunch this weekend?',
      point: '84',
      type: 'Blind Test',
      text: " I'll be in your neighborhood doing errands",
      timerStatus: 1,
      timer:5
    }
    return test;
  }

})();
