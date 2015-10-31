'use strict';
//var app = angular.module('myApp', ['ngRoute','ngMaterial','angular-svg-round-progress']);


angular
  .module('myApp')
  .controller('choiceCtrl', choiceController);

choiceController.$inject = ['$scope', '$rootScope', 'choiceService', '$location'];

function choiceController($scope, $rootScope, choiceService, $location) {

  $rootScope.test = choiceService;



  //var timer;
  //$scope.counter = 0;
  //$scope.stopCounter = function() {
  //  $timeout.cancel(timer);
  //};
  //var updateCounter = function() {
  //  $scope.counter++;
  //  timer = $timeout(updateCounter, 1000);
  //};
  //updateCounter();
  $rootScope.setTimer = setTimer;

  function setTimer($min,$type){
    if($rootScope.test.timer_value < 1){
      $rootScope.test.timer_value = 1;
    } else if($type == 'add'){
      $rootScope.test.timer_value += $min;
    } else if($type == 'set'){
      $rootScope.test.timer_value = $min;
    }
    $rootScope.test.timer_seconds = $rootScope.test.timer_value * 60;
    $rootScope.test.timer_percent = $rootScope.test.current_seconds/test.timer_seconds;
  }


};


