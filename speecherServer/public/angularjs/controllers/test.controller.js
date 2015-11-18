(function () {
  'use strict';

  angular
      .module('myApp')
      .controller('testCtrl', testController);

  testController.$inject = ['$scope','$rootScope', '$filter', '$location', '$route', '$timeout', '$cookieStore', 'choiceService', 'testService', 'speechService'];
  function testController($scope, $rootScope, $filter, $location, $route, $timeout, $cookieStore, choiceService, testService, speechService) {

    var vm = this;

    // APIs
    vm.test = choiceService;

    vm.start = false;
    vm.finish = false;
    vm.score = '...';

    vm.counter = 3;
    vm.timerState = vm.test.timer_status;
    vm.timerMinutes = vm.test.counter;
    vm.timerIntoSeconds = vm.timerMinutes * 60;
    vm.timerExceedSeconds = 0;
    vm.timerSecondTens = 0;
    vm.timerSecondUnits = 0;
    vm.scriptId = vm.test.script_id;
    vm.scriptResult = null;
    vm.testType = vm.test.type;
    vm.testTime = vm.test.counter;
    vm.testId = null;

    vm.speech  = speechService.recognition;
    vm.final_transcript  = '';
    vm.interim_transcript  = '';
    vm.startSpeech = startSpeech;

    var recordVideoSeparately = false;
    var socketio = io();
    var mediaStream = null;
    var recordAudio, recordVideo;

    vm.startSpeech = startSpeech;
    vm.reload = reload;

    var recordVideoSeparately = false;
    var socketio = io();
    var mediaStream = null;
    var recordAudio, recordVideo;

    (function initController() {

      countdown();
      var testCookie = $cookieStore.get('test');
      choiceService.saveItem(testCookie);
      vm.test = testCookie;
      vm.test.script_content_blank = getBlankScript(vm.test.script_content);
    })();

    vm.speech.onresult = function(event) {
      vm.interim_transcript = '';

      for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          vm.final_transcript += event.results[i][0].transcript;
        } else {
          vm.interim_transcript += event.results[i][0].transcript;
        }
      }

      vm.final_transcript = vm.final_transcript.replace(/\S/, function(m) { return m.toUpperCase(); });
    };

    function getBlankScript(script){
      var split = script.split(" ");
      var blank = "[         ]";

      for(var i = 0; i< split.length/10 ; i++){
        var random = Math.floor(Math.random() * split.length);
        if (split[random].length <= 2 || split[random] == blank) {
        }
        else {
          split[random] = blank;
        }
      }
      return split.join(" ");
    }

    function startSpeech() {

      console.log(speechService.recognizing);

      if (speechService.recognizing) {
        console.log("hello");
        speechService.recognition.stop();
        saveTestResult();
        return;
      }

      startRecording();
      speechService.final_transcript = '';
      speechService.recognition.start();
      speechService.ignore_onend = false;
      speechService.notify('info_allow');
    }

    function reload() {
      choiceService.saveItem(vm.test);
      $route.reload();
    }

    function timer() {
      var timerTimeout = $timeout(function () {
        //console.log(vm.timerMinutes + ":" + vm.timerSecondTens + vm.timerSecondUnits);

        vm.timerSecondUnits--;

        //console.log(vm.timerExceedSeconds);
        //console.log(vm.timerIntoSeconds);

        if (vm.timerSecondUnits == -1) {
          vm.timerSecondUnits = 9;
          vm.timerSecondTens--;
        }
        if (vm.timerSecondTens == -1) {
          vm.timerSecondTens = 5;
          vm.timerMinutes--;
        }

        if(vm.timerMinutes > -1) {
          vm.timerExceedSeconds++;
          timer();
        }
        else {
          vm.timerMinutes = vm.test.counter;
          vm.timerSecondTens = 0;
          vm.timerSecondUnits = 0;
          if (vm.timerState) {
            $timeout.cancel(timerTimeout);
          }
          vm.finish = true;
        }
      }, 1000);

      $rootScope.$on('$locationChangeStart', function(event) {
        $timeout.cancel(timerTimeout);
        vm.timerMinutes = vm.test.counter;
        vm.timerSecondTens = 0;
        vm.timerSecondUnits = 0;
        speechService.recognition.stop();
        speechService.recognizing = false;
      });
    }

    function countdown() {
      var countdownTimeout = $timeout(function () {
        if (vm.counter == 'START') {
          $timeout.cancel(countdownTimeout);
          vm.counter = 3;
          vm.start = true;
          startSpeech();
          timer();
        }
        else {
          vm.counter--;
          if (vm.counter == 0) {
            vm.counter = 'START';
          }
          countdown();
        }
      }, 1000);

      $rootScope.$on('$locationChangeStart', function(event) {
        $timeout.cancel(countdownTimeout);
        vm.counter = 3;
        speechService.recognition.stop();
        speechService.recognizing = false;
      });
    }

    function saveTestResult() {
      stopRecording();

      socketio.on('finished', function (fileName) {
        vm.filename =  fileName;
        console.log('got file ' + fileName);

        vm.scriptResult = $filter('diffFilter')(vm.final_transcript, vm.test.script_content);

        //console.log(vm.scriptResult);

        var testResult = {
          script_id: vm.scriptId,
          script_result : vm.scriptResult,
          test_type: vm.testType,
          test_time: vm.testTime,
          filename: vm.filename
        };
        console.log(testResult);

        testService.testResult = testResult;

        testService.saveTestResult(testResult).then(
            function (response) {
              console.log(response);
              if (response.data.success) {
                vm.score = response.data.result.score;
              }
              else {
                _errorHandler_('Error: success 0');
              }
            },
            _errorHandler_('Error: saveTestResult')
        );
        //$location.path('/result/' + vm.scriptId);
      });
    }

    // private functions
    function _errorHandler_(error) {
      console.log(error);
      return { success: false, message: error };
    }

    function startRecording() {

      vm.testId = socketio.id;
      //console.log(vm.testId);

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
})();
