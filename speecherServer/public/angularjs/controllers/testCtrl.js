'use strict';
//var app = angular.module('myApp', ['ngRoute','ngMaterial','angular-svg-round-progress']);

angular
  .module('myApp')
  .controller('testCtrl', testCtrl);
testCtrl.$inject = ['$scope','$rootScope', 'choiceService', '$timeout'];

function testCtrl($scope, $rootScope, choiceService, $timeout) {
  // 서버쪽 완성되면 요청해서 실데이터  ajax 매칭
  choiceService.current_seconds = 1;

  $scope.startTest = startTest();

  function startTest(){
    _addCount();
    function _addCount(){
      choiceService.current_seconds++;
      $timeout(_addCount, 1000);
    }
  }


}

