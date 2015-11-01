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

    $rootScope.test.counter = 5;

  })();



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


  // Timer Setting 값을 저장하고, 테스트 페이지로 이동
  $rootScope.test.startTest = startTest;
  function startTest(){
    //choiceService.saveItem(scriptData);
    $location.path('/test');
  }


};


