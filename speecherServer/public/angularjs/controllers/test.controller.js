(function () {
  'use strict';

  angular
      .module('myApp')
      .controller('testCtrl', testController);

  testController.$inject = ['$scope','$rootScope', '$filter', '$location' ,'$cookieStore', 'choiceService', 'testService'];

  function testController($scope, $rootScope, $filter, $location ,$cookieStore, choiceService, testService) {

    $rootScope.test = choiceService;
    //$scope.startTest = startTest;
    //$scope.finishTest = finishTest;

    (function initController() {
      var testCookie = $cookieStore.get('test');
      choiceService.saveItem(testCookie);
      $rootScope.test = testCookie;
      $rootScope.test.script_content_blank = getBlankScript($rootScope.test.script_content);

    })();

    $scope.speech = {
      "maxResults": 2200,
      "continuous": true,
      "interimResults": true,
      "recognizing": true,
      "value":""
    };



    // Script 를  Blank화해서 저장한 후 보여준다  (구현중)
    function getBlankScript(script){
      var split = script.split(" ");
      var blank = "[         ]";
      for(var i = 0; i< split.length/10 ; i++){
        var random = Math.floor(Math.random() * split.length) + 1;
        if(split[random].length <= 3 || split[random] == blank){

        }else{
          split[random] = blank;
        }

      }
      return split.join(" ");
    }


    ////$rootScope.test.script =  test 의  script_content;
    //$rootScope.test.speech = $scope.speech;

    function startTest(){
      $rootScope.test.startTest();

    }

    function finishTest(){
      //$scope.speech.recognizing = false;
      $rootScope.test.finishTest();
    }


    // Made by Sojin

    var vm = this;

    // APIs
    vm.testInfo = $rootScope.test;
    vm.scriptId = $rootScope.test.script_id;
    vm.scriptResult = null;
    vm.testType = $rootScope.test.type;
    vm.testTime = $rootScope.test.counter;
    vm.testId = null;

    $rootScope.test.saveTestResult = saveTestResult;
    $rootScope.test.startRecording = startRecording;
    $rootScope.test.stopRecording = stopRecording;

    function saveTestResult() {

      stopRecording();

      vm.scriptResult = $filter('diffFilter')($scope.speech.value, $rootScope.test.script_content);
      //console.log(vm.scriptResult);

      var testResult = {
        script_id: vm.scriptId,
        script_result : vm.scriptResult,
        test_type: vm.testType,
        test_time: vm.testTime,
        test_id: vm.testId
      };
      console.log(testResult);

      testService.testResult = testResult;

      testService.saveTestResult(testResult).then(
          function (response) {
            if (response.data.success) {
              $location.path('/result');
            }
            else {
              _errorHandler_('Error: success 0');
            }
          },
          _errorHandler_('Error: saveTestResult')
      );
      $location.path('/result/' + vm.scriptId);
    }

    // private functions
    function _errorHandler_(error) {
      console.log(error);
      return { success: false, message: error };
    }

    var recordVideoSeparately = false;
    var socketio = io();
    var mediaStream = null;
    var recordAudio, recordVideo;

    function startRecording() {

      vm.testId = socketio.id;
      console.log(vm.testId);

      navigator.getUserMedia({
        audio: true,
        video: false
      }, function (stream) {
        mediaStream = stream;
        recordAudio = RecordRTC(stream, {
          onAudioProcessStarted: function () {
            recordVideoSeparately && recordVideo.startRecording();
          }
        });
        recordVideo = RecordRTC(stream, {
          type: 'video'
        });
        recordAudio.startRecording();
      }, function (error) {
        alert(JSON.stringify(error));
      });
    }

    function stopRecording() {
      // stop audio recorder
      recordVideoSeparately && recordAudio.stopRecording(function () {
        // stop video recorder
        recordVideo.stopRecording(function () {
          // get audio data-URL
          recordAudio.getDataURL(function (audioDataURL) {
            // get video data-URL
            recordVideo.getDataURL(function (videoDataURL) {
              var files = {
                audio: {
                  type: recordAudio.getBlob().type || 'audio/wav',
                  dataURL: audioDataURL
                },
                video: {
                  type: recordVideo.getBlob().type || 'video/webm',
                  dataURL: videoDataURL
                }
              };
              socketio.emit('message', files);
              if (mediaStream) mediaStream.stop();
            });
          });
        });
      });
      // if firefox or if you want to record only audio
      // stop audio recorder
      !recordVideoSeparately && recordAudio.stopRecording(function () {
        // get audio data-URL
        recordAudio.getDataURL(function (audioDataURL) {
          var files = {
            audio: {
              type: recordAudio.getBlob().type || 'audio/wav',
              dataURL: audioDataURL
            }
          };
          socketio.emit('message', files);
          if (mediaStream) mediaStream.stop();
        });
      });
    }
  }
  angular
      .module('myApp')
      .controller('testCtrl', testController);


  testController.$inject = ['$scope','$rootScope', '$filter', '$location' ,'$cookieStore', 'choiceService', 'testService'];
})();
