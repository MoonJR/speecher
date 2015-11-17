(function () {
  'use strict';

  angular
      .module('myApp')
      .factory('speechService', speechService);

  speechService.$inject = ['$window', '$rootScope'];
  function speechService($window, $rootScope) {

    var service = {};

    if (!('webkitSpeechRecognition' in $window)) {
      notify('info_upgrade');
    } else {
      service.final_transcript = '';
      service.interim_transcript = '';
      service.recognizing = false;
      service.ignore_onend;

      service.recognition = new webkitSpeechRecognition();
      service.recognition.continuous = true;
      service.recognition.interimResults = true;
      service.recognition.lang = 'en-US';

      service.recognition.onstart = onStart;
      service.recognition.onerror = onError;
      service.recognition.onend = onEnd;
      //service.recognition.onresult = onResult;
      service.notify = notify;
    }

    return service;

    var information  = {
      'info_speak_now': '지금 말하세요.',
      'info_no_speech': '음성이 감지되고 있지 않습니다. <a href="//support.google.com/chrome/bin/answer.py?hl=en&amp;answer=1407892">마이크 설정을 확인해보세요.</a>',
      'info_no_microphone': '마이크를 못 찾고 있습니다. <a href="//support.google.com/chrome/bin/answer.py?hl=en&amp;answer=1407892">마이크가 설치되었는지 마이크 설정을 확인해보세요.</a>',
      'info_allow': '마이크 사용을 허용해주세요.',
      'info_denied': '마이크 사용 권한이 거절되었습니다.',
      'info_blocked': '마이크 사용 권한이 막혀있습니다. 설정을 바꾸기 위해서는 chrome://settings/contentExceptions#media-stream에 사이트 url을 추가해주세요.',
      'info_upgrade': 'Web Speech API를 지원하지 않는 브라우저 입니다. <a href="//www.google.com/chrome">크롬 브라우저 25버전 이상으로 업데이트 해주세요.</a>'
    };

    function onStart() {
      service.recognizing = true;
      notify('info_speak_now');
    }

    function onError(event) {
      if (event.error == 'no-speech') {
        notify('info_no_speech');
        service.ignore_onend = true;
      }
      if (event.error == 'audio-capture') {
        notify('info_no_microphone');
        service.ignore_onend = true;
      }
      if (event.error == 'not-allowed') {
        if (event.timeStamp - start_timestamp < 100) {
          notify('info_blocked');
        } else {
          notify('info_denied');
        }
        service.ignore_onend = true;
      }
    }

    function onEnd() {
      service.recognizing = false;
      if (service.ignore_onend) {
        return;
      }
      if (!service.final_transcript) {
        notify('info_start');
        return;
      }
      notify('');
    }

    function onResult(event) {
      var interim_transcript = '';
      for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          service.final_transcript += event.results[i][0].transcript;
        } else {
          interim_transcript += event.results[i][0].transcript;
        }
      }

      service.final_transcript = service.final_transcript.replace(/\S/, function(m) { return m.toUpperCase(); });


      return service.final_transcript;
    }

    function notify(message) {
      for(var info in information) {
        if(information == message) {
          return information[info];
        }
      }
    }

  }
})();
