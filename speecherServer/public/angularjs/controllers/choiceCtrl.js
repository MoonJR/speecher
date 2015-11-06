'use strict';
//var app = angular.module('myApp', ['ngRoute','ngMaterial','angular-svg-round-progress']);


angular
  .module('myApp')
  .controller('choiceCtrl', choiceController);

choiceController.$inject = ['$scope', '$rootScope','$cookieStore', 'choiceService', '$location'];

function choiceController($scope, $rootScope, $cookieStore, choiceService, $location) {

  $rootScope.test = choiceService;

  // init latest test data status(새로고침 해도 저장된 데이터 불러오도록하기)
  (function initController() {

    var testCookie = $cookieStore.get('test');
    //console.log("called test cookie id:"+testCookie["id"]);
    $rootScope.test.counter = 5;
    $rootScope.test.timer_status = true;
    $rootScope.test.status = "WAIT";
    // 테스트할때만  try 로 정상동작 생각대로 되면 추후  try 제거하고 조건
    try{
      choiceService.saveItem(testCookie);
    }catch(e){
      console.log("choice init loading cookie error:"+e);
    }


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
  //$rootScope.test.startTest = startTest;
  //function startTest(){
  //  choiceService.saveItem(scriptData);
  //  $cookieStore.put('test', $rootScope.test);
  //  //아직 저장 상태는 어느시점으로할지 생각
  //  $location.path('/test');
  //}


};


