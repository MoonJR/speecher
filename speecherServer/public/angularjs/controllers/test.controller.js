'use strict';
//var app = angular.module('myApp', ['ngRoute','ngMaterial','angular-svg-round-progress']);

angular
  .module('myApp')
  .controller('testCtrl', testCtrl);
testCtrl.$inject = ['$scope','$rootScope','$location', 'choiceService', '$timeout'];

function testCtrl($scope, $rootScope,$location, choiceService, $timeout) {
  // 서버쪽 완성되면 요청해서 실데이터  ajax 매칭
  choiceService.current_seconds = 1;

  $scope.startTest = startTest();

  function startTest(){
    _addCount();

    function _addCount(){
      choiceService.current_seconds++;
      choiceService.timer_percent = choiceService.current_seconds/choiceService.timer_seconds * 100;


      if(choiceService.timer_percent >= 100){
        choiceService.timer_percent = 100;
        finishTest(true);
      }else{
        //$timeout(_addCount, 30);
        $timeout(_addCount, 1000);
      }
    }

    function finishTest(isTimeFinished){
      if(isTimeFinished){
        choiceService.status = "FINISH";
      }else{
        choiceService.status = "WAIT";
      }

      $timeout.cancel(_addCount);
      $location.path('/result');
    };
  }



}

