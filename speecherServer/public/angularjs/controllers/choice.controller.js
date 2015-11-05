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


    //저장해 둔 데이터 로드
    $rootScope.test.saveItem(testCookie);

    //저장된 값에 영향없는 초기값
    $rootScope.test.testnow = false;
    $rootScope.test.current_seconds = 0;

    //page change status
    $rootScope.$on('$locationChangeSuccess', function() {
      $rootScope.actualLocation = $location.path();
    });

    $rootScope.$watch(function () {return $location.path()}, function (newLocation, oldLocation) {
      if($rootScope.actualLocation === newLocation) {
        //back 새로고침시 갱신 데이터
        $rootScope.test.testnow = false;
        $rootScope.test.resetCount();
        $rootScope.test.stopCount();
      }
    });
  })();


};


