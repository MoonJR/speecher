(function () {
  'use strict';

  angular
      .module('myApp')
      .controller('writeController', writeController);

  writeController.$inject = [];
  function writeController() {

    var vm = this;

    // APIs
    vm.content;
    vm.showContent = showContent;

    function showContent($fileContent) {
      vm.content = $fileContent;
    }
  }
})();

