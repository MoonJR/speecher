$(document).on("click", ".play", function() {
  var value = $(this).val();
  var voiceNum =  $(this).parent().find(".voiceNum").val();
  console.log("value:"+value);
  var msg = new SpeechSynthesisUtterance();
  var voices = window.speechSynthesis.getVoices();
  console.dir(voiceNum);

  msg.voice = voices[83]; // Note: some voices don't support altering params
  msg.voiceURI = 'native';
  msg.volume = 1; // 0 to 1
  msg.rate = 0.1; // 0.1 to 10
  msg.pitch = 0; //0 to 2
  msg.text = value;
  msg.lang = 'en';
  window.speechSynthesis.speak(msg);
});

