(function () {
  'use strict';

  angular
      .module('myApp')
      .controller('writeController', writeController);

  writeController.$inject = ['$scope'];
  function writeController($scope) {

    $scope.readFile = function($file){
      $scope.title = $file.title;
      console.log($scope.title);
      $scope.content = $file.content;
      console.log($scope.content);
    };
  }
})();

