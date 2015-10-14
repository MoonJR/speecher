(function () {
  //var app = angular.module('StarterApp', []);
  var app = angular.module('StarterApp', ['ngMaterial']);
  app.controller('HeaderCtrl',   function($scope){
    $scope.type = "header";
  });
})();


