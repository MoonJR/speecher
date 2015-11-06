(function () {
  'use strict';

  angular
      .module('myApp')
      .factory('testService', testService);

  testService.$inject = ['$http'];
  function testService($http) {

    var service = {};

    // APIs
    service.saveTestResult = saveTestResult;

    return service;

    function saveTestResult(testResult) {
      return $http.post('/test/save', testResult).then(_successHandler_, _errorHandler_('Error: getScriptSave'));
    }


    // private functions
    function _successHandler_(response) {
      if(response.data.success) {
        return response;
      } else {
        _errorHandler_('Error: success 0');
      }
    }

    function _errorHandler_(error) {
      return { success: false, message: error };
    }
  }
})();