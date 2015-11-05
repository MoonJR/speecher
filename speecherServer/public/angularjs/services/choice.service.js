(function () {
  'use strict';

  angular
    .module('myApp')
    .factory('choiceService', choiceService);

  choiceService.$inject = ['$http', '$cookieStore', '$rootScope','$location', '$timeout'];
  //가장 최근에 선택된 test 글로벌 값을 관리한다
  function choiceService($http, $cookieStore, $rootScope, $location, $timeout) {
    var test = {};
    //function
    test.moveTest = moveTest;
    test.startTest = startTest;
    test.finishTest = finishTest;
    test.resetCount = resetCount;
    test.stopCount = stopCount;
    test.saveItem = saveItem;
    test.setTimer = setTimer;
    test.setType = setType;

    test.counter = 5;
    test.timer_status = true;
    test.timer_seconds = 300;
    test.current_seconds = 0;
    test.timer_percent = 0;
    test.status = "WAIT";
    test.type = "READ";//READ, BLANK, REAL
    test.testnow = false;

    return test;

    function setType(type){
      if(type == 1){
        test.type = "READ";
      }else if(type == 2){
        test.type = "BLANK";
      }else if(type == 3){
        test.type = "REAL";
      }
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

    //function startTest(scriptData){
    //  //위의 set까지는 cookie 세이브가아닌 페이지 내에서의 저장
    //  saveItem(scriptData);
    //  $location.path('/test');
    //}
    function moveTest(scriptData){
      //위의 set까지는 cookie 세이브가아닌 페이지 내에서의 저장
      saveItem(scriptData);
      stopCount();//뒤로가기 후 앞으로가기등 상황 대비 리셋용
      $location.path('/test');
    }

    //Test  시작 버튼,  Timer 시작 및,  Record 시작
    function startTest(){
      test.testnow = true;
      startCount();
      startRecord();

    }

    function finishTest(isTimeFinished){
      if(isTimeFinished){
        test.status = "FINISH";

      }else{
        test.status = "WAIT";

      }
      stopCount();
      $location.path('/result');
    };


    function startCount(){
      if(!test.testnow) {
        stopCount();
      }else{
        test.current_seconds++;
        test.timer_percent = test.current_seconds/test.timer_seconds * 100;
        $timeout(startCount, 1000);
        if(test.timer_percent >= 100){
        }
      }
    }
    function stopCount(){
      resetCount();
      test.testnow = false;
      $timeout.cancel(startCount);
    }

    function resetCount(){
      test.current_seconds = 0;
      test.timer_percent = 0;
    }

    function startRecord(){}
    function stopRecord(){}

  }
})();
