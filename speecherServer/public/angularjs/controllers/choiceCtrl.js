'use strict';
//var app = angular.module('myApp', ['ngRoute','ngMaterial','angular-svg-round-progress']);


angular
  .module('myApp')
  .controller('choiceCtrl', choiceController);

choiceController.$inject = ['$scope', '$rootScope', 'choiceService', '$location'];

function choiceController($scope, $rootScope, choiceService, $location) {
  $rootScope.test = choiceService;

  $scope.addTimer = function($min){
    choiceService.timer_value += $min;
  }
  $scope.setTimer = function($min){
    choiceService.timer_value = $min;
  }



};


