(function () {
  'use strict';

  angular
    .module('myApp')
    .factory('httpService', httpService);

  httpService.$inject = ['$http', '$cookieStore', '$rootScope'];
  function httpService($http, $cookieStore, $rootScope) {
    function _postModel(url, callback) {
      return $http({
        method: 'POST', //방식
        url: url, /* 통신할 URL */
        headers: {'Content-Type': 'application/json; charset=utf-8'} //헤더
      })
        .success(callback)
        .error(function (data, status) {
          /* 서버와의 연결이 정상적이지 않을 때 처리 */
          console.log(status);
        });
    }

    var httpService = {};
    httpService = {
      postModel: _postModel,
    }
    return httpService;
  }




})();
