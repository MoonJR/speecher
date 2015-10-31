'use strict';
//var app = angular.module('myApp', ['ngRoute','ngMaterial','angular-svg-round-progress']);


angular
  .module('myApp')
  .controller('choiceCtrl', choiceController);

choiceController.$inject = ['$scope', '$rootScope','$cookieStore', 'choiceService', '$location'];

function choiceController($scope, $rootScope, $cookieStore, choiceService, $location) {

  $rootScope.test = choiceService;

  // init latest test data status
  (function initController() {
    var favoriteCookie = $cookieStore.get('test');
  })();

  var timer;
  $scope.counter = 0;
  $scope.stopCounter = function() {
    $timeout.cancel(timer);
  };
  $scope.startCounter = function() {
    updateCounter
  };
  var updateCounter = function() {
    $scope.counter++;
    timer = $timeout(updateCounter, 1000);
  };
  //updateCounter();
  //$rootScope.setTimer = setTimer;
  //
  //function setTimer($min,$type){
  //  if($rootScope.test.timer_value < 1){
  //    $rootScope.test.timer_value = 1;
  //  } else if($type == 'add'){
  //    $rootScope.test.timer_value += $min;
  //  } else if($type == 'set'){
  //    $rootScope.test.timer_value = $min;
  //  }
  //  $rootScope.test.timer_seconds = $rootScope.test.timer_value * 60;
  //  $rootScope.test.timer_percent = $rootScope.test.current_seconds/test.timer_seconds;
  //}


};


