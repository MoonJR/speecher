(function () {
  'use strict';

  angular
    .module('myApp')
    .factory('choiceService', choiceService);

  choiceService.$inject = ['$http', '$cookieStore', '$rootScope','$location', '$timeout'];
  //가장 최근에 선택된 test 글로벌 값을 관리한다
  function choiceService($http, $cookieStore, $rootScope, $location, $timeout) {

    var typeText =["등록한 대본을 보면서 읽을 수 있도록, 대본을 보여주는 상태로 테스트를 진행합니다","등록한 대본의 일부를 랜덤 빈칸으로 비워둔 상태로 테스트를 진행합니다.", "등록한 대본을 이용한 마지막 실전 테스트입니다. 대본의 내용을 보지 않고 테스트를 진행합니다"];
    var types =["대본읽기", "빈칸테스트","실전테스트"];
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
    test.types = types;
    test.type = types[0];
    test.testnow = false;
    test.typeText = typeText[0];


    (function initController() {

      test.counter = 5;
      test.timer_status = true;
      test.timer_seconds = 300;
      test.current_seconds = 0;
      test.remain_seconds = 300;
      test.timer_percent = 0;
      test.status = "WAIT";
      test.type = types[0];
      test.testnow = false;
      test.typeText = typeText[0];
      var testCookie = $cookieStore.get('test');
      test.saveItem(testCookie);
    });



    return test;

    function setType(type){
      test.type = types[type];
      test.typeText = typeText[type];
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


    function setTimer($min){
      if(test.counter < 1){
        test.counter = 1;
      }
      test.counter = $min;
      test.timer_seconds = test.counter * 60;
      test.timer_percent = test.current_seconds/test.timer_seconds;
      test.remain_seconds = test.timer_seconds - test.current_seconds;
      //$cookieStore.put('test', $rootScope.test);
    }

    //function startTest(scriptData){
    //  //위의 set까지는 cookie 세이브가아닌 페이지 내에서의 저장
    //  saveItem(scriptData);
    //  $location.path('/test');
    //}
    function moveTest(){
      //위의 set까지는 cookie 세이브가아닌 페이지 내에서의 저장

      stopCount();//뒤로가기 후 앞으로가기등 상황 대비 리셋용
      setTimer(test.counter);
      saveItem(test);

      $location.path('/test');
    }

    //Test  시작 버튼,  Timer 시작 및,  Record 시작
    function startTest(){
      test.testnow = true;
      startCount();
      startRecord();
      //test.speech.recognizing = true;

    }

    function finishTest(isTimeFinished){
      if(isTimeFinished){
        test.status = "FINISH";

      }else{
        test.status = "WAIT";

      }
      //test.speech.recognizing = false;
      stopCount();
      $location.path('/result');
    };

    function startCount(){
      if(!test.testnow) {
        stopCount();
      }else{
        test.current_seconds++;
        test.timer_percent = test.current_seconds/test.timer_seconds * 100;
        test.remain_seconds = test.timer_seconds - test.current_seconds;
        $timeout(startCount, 1000);

      }
    }
    function stopCount(){

      resetCount();
      test.remain_seconds = test.timer_seconds;
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
