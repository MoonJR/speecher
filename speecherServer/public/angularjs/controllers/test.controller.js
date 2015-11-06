(function () {
  'use strict';

  angular
      .module('myApp')
      .controller('testCtrl', testController);


  testController.$inject = ['$scope','$rootScope', '$filter', '$location' ,'$cookieStore', 'choiceService', 'scriptService', 'testService'];
  function testController($scope, $rootScope, $filter, $location ,$cookieStore, choiceService, scriptService, testService) {

    $rootScope.test = choiceService;

    (function initController() {
      var testCookie = $cookieStore.get('test');
      choiceService.saveItem(testCookie);
      $rootScope.test = testCookie;

    })();

    $scope.speech = {
      "maxResults": 3000,
      "continuous": true,
      "interimResults": true,
      "recognizing": false,
      "value":""
    };

    //$rootScope.test.script =  test 의  script_content;
    $rootScope.test.speech = '';
    $rootScope.test.interSpeech = $scope.speech['interimResults'];



    // Made by Sojin

    var vm = this;

    // APIs
    vm.testInfo = $rootScope.test;
    vm.scriptId = $rootScope.test.script_id;
    vm.scriptResult = null;
    vm.testType = $rootScope.test.type;
    vm.testTime = $rootScope.test.counter;
    vm.testId = null;

    vm.saveTestResult = saveTestResult;
    vm.startRecording = startRecording;
    vm.stopRecording = stopRecording;

    function saveTestResult() {

      stopRecording();

      vm.scriptResult = $filter('diffFilter')($scope.speech.value, $rootScope.test.script_content);
      console.log(vm.scriptResult);

      var testResult = {
        script_id: vm.scriptId,
        script_result : vm.scriptResult,
        test_type: vm.testType,
        test_time: vm.testTime,
        test_id: vm.testId
      };

      testService.saveTestResult(testResult).then(
          function (response) {
            if (response.data.success) {
              console.log(response);
            }
            else {
              _errorHandler_('Error: success 0');
            }
          },
          _errorHandler_('Error: saveTestResult')
      );
    }

    // private functions
    function _errorHandler_(error) {
      return { success: false, message: error };
    }

    var recordVideoSeparately = false;
    var socketio = io();
    var mediaStream = null;
    var recordAudio, recordVideo;

    function startRecording() {
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

    socketio.on('finished', function (fileName) {
      var href = (location.href.split('/').pop().length
              ? location.href.replace(location.href.split('/').pop(), '')
              : location.href
      );
      vm.testId = socketio.id;
      //console.log('socketio id: ' + vm.testId);
    });

  }
})();
