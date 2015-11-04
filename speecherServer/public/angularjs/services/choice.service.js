(function () {
  'use strict';

  angular
    .module('myApp')
    .factory('choiceService', choiceService);

  choiceService.$inject = ['$http', '$cookieStore', '$rootScope'];
  //가장 최근에 선택된 test 글로벌 값을 관리한다
  function choiceService($http, $cookieStore, $rootScope) {
    var test = {};
    //function
    test.startTest = startTest;
    test.addTimer = addTimer;
    test.saveItem = saveItem;
    test.setTimer = setTimer;

    return test;


    function addTimer(min){
      if(test.timer_value < 0){
        test.timer_value = 0;
      } else{
        test.timer_value += min;
      }
      test.timer_seconds = test.timer_value * 60;
      test.timer_percent = test.current_seconds/test.timer_seconds;
    }

    //  indexPage 에서 테스트 버튼 클릭시 관련 스크립트의 데이터를 rootScope 의 test에서 쓸 수 있도록 저장한다
    function saveItem(item){
      for (var key in item) {
        if (item.hasOwnProperty(key)) {
          var obj = item[key];
          console.log(key+","+obj);
          test[key] = obj;
        }
      }
      $cookieStore.put('test', test);
      var cookie = $cookieStore.get('test');
      console.log("cookie:"+cookie);
    }

    function setTimer($min,$type){
      if($rootScope.test.counter < 1){
        $rootScope.test.counter = 1;
      } else if($type == 'add'){
        $rootScope.test.counter += $min;
      } else if($type == 'set'){
        $rootScope.test.counter = $min;
      }
      $rootScope.test.timer_seconds = $rootScope.test.timer_value * 60;
      $rootScope.test.timer_percent = $rootScope.test.current_seconds/$rootScope.test.timer_seconds;
      //$cookieStore.put('test', $rootScope.test);
    }

    function startTest(scriptData){
      saveItem(scriptData);
      //아직 저장 상태는 어느시점으로할지 생각
      $location.path('/test');
    }
  }
})();
