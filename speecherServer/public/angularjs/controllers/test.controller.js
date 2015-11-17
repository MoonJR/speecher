(function () {
  'use strict';

  angular
      .module('myApp')
      .controller('testCtrl', testController);

  testController.$inject = ['$scope','$rootScope', '$filter', '$location', '$timeout', '$cookieStore', 'choiceService', 'testService', 'speechService'];
  function testController($scope, $rootScope, $filter, $location, $timeout, $cookieStore, choiceService, testService, speechService) {

    $rootScope.test = choiceService;

    // Script 를  Blank화해서 저장한 후 보여준다  (구현중)
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

    // Made by Sojin

    var vm = this;

    // APIs
    vm.start = false;
    vm.finish = false;

    vm.counter = 3;
    vm.timerState = $rootScope.test.timer_status;
    vm.timerMinutes = $rootScope.test.counter;
    vm.timerIntoSeconds = vm.timerMinutes * 60;
    vm.timerExceedSeconds = 0;
    vm.timerSecondTens = 0;
    vm.timerSecondUnits = 0;

    vm.testInfo = $rootScope.test;
    vm.scriptId = $rootScope.test.script_id;
    vm.scriptResult = null;
    vm.testType = $rootScope.test.type;
    vm.testTime = $rootScope.test.counter;
    vm.testId = null;

    vm.saveTestResult = saveTestResult;
    vm.startRecording = startRecording;
    vm.stopRecording = stopRecording;

    vm.speech  = speechService.recognition;
    vm.final_transcript  = '';
    vm.interim_transcript  = '';

    (function initController() {
      countdown();
      var testCookie = $cookieStore.get('test');
      choiceService.saveItem(testCookie);
      $rootScope.test = testCookie;
      $rootScope.test.script_content_blank = getBlankScript($rootScope.test.script_content);
      startSpeech();
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

    function startSpeech() {
      if (speechService.recognizing) {
        speechService.recognition.stop();
        return;
      }

      speechService.final_transcript = '';
      speechService.recognition.start();
      speechService.ignore_onend = false;

      speechService.notify('info_allow');
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
          vm.timerMinutes = $rootScope.test.counter;
          vm.timerSecondTens = 0;
          vm.timerSecondUnits = 0;
          $timeout.cancel(timerTimeout);
          vm.finish = true;
        }
      }, 1000);

      $rootScope.$on('$locationChangeStart', function(event) {
        $timeout.cancel(timerTimeout);
        vm.timerMinutes = $rootScope.test.counter;
        vm.timerSecondTens = 0;
        vm.timerSecondUnits = 0;
      });
    }

    function countdown() {
      var countdownTimeout = $timeout(function () {
        if (vm.counter == 'START') {
          $timeout.cancel(countdownTimeout);
          vm.counter = 3;
          vm.start = true;

          if (vm.timerState) {
            timer();
          }
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
      });
    }

    function saveTestResult() {
      stopRecording();

      socketio.on('finished', function (fileName) {
        vm.filename =  fileName;
        console.log('got file ' + fileName);

        vm.scriptResult = $filter('diffFilter')($scope.speech.value, $rootScope.test.script_content);
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
                $location.path('/result');
              }
              else {
                _errorHandler_('Error: success 0');
              }
            },
            _errorHandler_('Error: saveTestResult')
        );
        $location.path('/result/' + vm.scriptId);
      });
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
})();
