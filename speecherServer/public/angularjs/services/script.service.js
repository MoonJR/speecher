(function () {
  'use strict';

  angular
      .module('myApp')
      .factory('scriptService', scriptService);

  scriptService.$inject = ['$http', '$cacheFactory'];
  function scriptService($http, $cacheFactory) {

    var service = {};

    // APIs
    service.scriptList = null;
    service.saveScript = saveScript;
    service.deleteScript = deleteScript;
    service.getScript = getScript;
    service.getWrongWord = getWrongWord;
    service.getScriptList = getScriptList;
    service.getWrongWordAll = getWrongWordAll;
    service.getScriptWrongWord = getScriptWrongWord;
    service.getWordDetail = getWordDetail;
    service.getTestSummary = getTestSummary;

    return service;

    function saveScript(script) {
      return $http.post('/main/scriptSave', script).then(_successHandler_, _errorHandler_('Error: getScriptSave'));
    }

    function deleteScript(scriptId) {
      return $http.post('main/scriptDelete', scriptId).then(_successHandler_, _errorHandler_('Error: getScriptSave'));
    }

    function getScript(scriptId) {
      return $http.post('/scriptDetail/scriptContent', scriptId).then(_successHandler_, _errorHandler_('Error: getScript'));
    }

    function getWrongWord(scriptId) {
      return $http.post('/main/totalFailList', scriptId).then(_successHandler_, _errorHandler_('Error: getWrongWord'));
    }

    function getScriptList() {
      return $http.post('/main/scriptList').then(_successHandler_, _errorHandler_('Error: getScriptList'));
    }

    function getWrongWordAll() {
      return $http.post('/main/totalFailList').then(_successHandler_, _errorHandler_('Error: getWrongWordAll'));
    }

    function getWordDetail(word) {
      return $http.post('main/wordDetail', word).then(_successHandler_, _errorHandler_('Error: getWordDetail'));
    }

    function getTestSummary() {
      return $http.post('main/testScoreList').then(_successHandler_, _errorHandler_('Error: getTestSummary'));
    }

    function getScriptWrongWord(scriptId) {
      return $http.post('/scriptDetail/failList', scriptId).then(_successHandler_, _errorHandler_('Error: getWrongWordAll'));
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
