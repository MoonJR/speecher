(function () {
  'use strict';

  angular
    .module('myApp')
    .factory('choiceService', choiceService);

  choiceService.$inject = ['$http', '$cookieStore', '$rootScope','$location'];
  //가장 최근에 선택된 test 글로벌 값을 관리한다
  function choiceService($http, $cookieStore, $rootScope, $location) {
    var test = {};
    //function
    test.startTest = startTest;
    test.saveItem = saveItem;
    test.setTimer = setTimer;
    test.counter = 5;
    test.timer_status = true;
    test.timer_seconds = 300;
    test.current_seconds = 0;
    test.timer_percent = 0;
    test.status = "WAIT";

    //init value


    return test;




    //  indexPage 에서 테스트 버튼 클릭시 관련 스크립트의 데이터를 rootScope 의 test에서 쓸 수 있도록 저장한다
    function saveItem(item){
      for (var key in item) {
        if (item.hasOwnProperty(key)) {
          var obj = item[key];
          console.log(key+","+obj);
          test[key] = obj;
        }
      }
      $cookieStore.put("test", test);
      var cookie = $cookieStore.get("test");
      console.log("cookie:"+cookie["script_id"]);
    }

    function setTimer($min,$type){
      if(test.counter < 1){
        test.counter = 1;
      } else if($type == 'add'){
        test.counter += $min;
      } else if($type == 'set'){
        test.counter = $min;
      }
      test.timer_seconds = test.counter * 60;
      test.timer_percent = test.current_seconds/test.timer_seconds;
      //$cookieStore.put('test', $rootScope.test);
    }

    function startTest(scriptData){
      saveItem(scriptData);
      //아직 저장 상태는 어느시점으로할지 생각
      $location.path('/test');
    }
  }
})();
