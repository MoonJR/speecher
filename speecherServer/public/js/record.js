var recordVideoSeparately = false;
var socketio = io();
var mediaStream = null;
var recordAudio, recordVideo;

function startRecordingFunc() {
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

function stopRecordingFunc () {
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
  href = href + 'uploads/' + fileName;
  console.log('got file ' + href);
});
