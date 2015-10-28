(function () {
  'use strict';

  angular
      .module('myApp')
      .controller('writeController', writeController);

  writeController.$inject = ['$rootScope', '$scope'];
  function writeController($rootScope, $scope) {

    //var vm = this;
    //
    //vm.title = null;
    //vm.content = null;
    //vm.readFile = readFile;
    //
    //function readFile(element) {
    //  console.log('files:', element.files);
    //  var reader = new FileReader();
    //  //var file = onChangeEvent.target.files[0];
    //
    //  reader.onload = function(element) {
    //    $rootScope.$apply(function() {
    //      vm.title = file.name;
    //      vm.content = onLoadEvent.target.result;
    //    });
    //  };
    //  //
    //  //reader.readAsText(file);
    //  console.log(vm.title);
    //  console.log(vm.content);
    //}

    $scope.readFile = function($file){
      $scope.title = $file.title;
      $scope.content = $file.content;
    };
  }
})();

