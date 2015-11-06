(function () {
  'use strict';

  angular
      .module('myApp')
      .controller('resultController', resultController);

  resultController.$inject = ['testService'];
  function resultController(testService) {
    var result = this;
  }
})();

