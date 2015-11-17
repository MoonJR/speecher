$(document).on("click", ".play", function() {
  var value = $(this).val();

  var voiceNum =  $(this).parent().find(".voiceNum").val();
  var repeat =  $(this).parent().find(".repeat").val();
  //var rate =  $(this).parent().find(".rate").val();
  var msg = new SpeechSynthesisUtterance();
  var voices = window.speechSynthesis.getVoices();


  msg.voice = voices[8]; // Note: some voices don't support altering params
  msg.voiceURI = 'native';
  msg.volume = 1; // 0 to 1
  msg.rate = 5; // 0.1 to 10
  msg.pitch = 0; //0 to 2
  msg.text = value;
  msg.lang = 'en';
  //msg.lang = 'ko';
  console.log(msg);
  for(i=0; i<repeat ;i++){

    window.speechSynthesis.speak(msg);
  }

});


$(document).on("click", ".play-tts", function() {
  if($(this).val() == "speak"){
    $(this).val("stop");
    $(this).text("TTS");
    window.speechSynthesis.cancel();
    return;
  }else{

    $(this).val("speak");
    $(this).text("STOP");
    var value = $('#script').text();
    var repeat =  $(this).parent().find(".repeat").val();
    var msg = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();


    msg.voice = voices[83]; // Note: some voices don't support altering params
    msg.voiceURI = 'native';
    msg.volume = 1; // 0 to 1
    msg.rate = 5; // 0.1 to 10
    msg.pitch = 0; //0 to 2
    msg.text = value;
    msg.lang = 'en';
    //msg.lang = 'ko';


    for(i=0; i<repeat ;i++){
      window.speechSynthesis.speak(msg);
    }
  }



});






