(function () {
  'use strict';

  angular
      .module('myApp')
      .controller('speechController', speechController);

  speechController.$inject = ['$scope', '$http'];
  function speechController($scope, $http) {

    var vm = this;

    // APIs
    vm.speech = {
      maxResults: 25,
      continuous: true,
      interimResults: false,
      value: ''
    };

    vm.script = 'The old red fox is running away from the dog';

    // private functions
    function _errorHandler_ (error) {
      return { success: false, message: error };
    }
  }
})();

