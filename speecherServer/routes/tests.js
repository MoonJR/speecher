/**
 * Created by kimminki on 2015. 10. 12..
 */
var dbTest = require('../models/dbTest');
var error = require('../routes/error');
var natural = require('natural');
var uuid = require('node-uuid');
var scriptUtil = require('./saveScript');
var tokenizer = new natural.TreebankWordTokenizer();

exports.testList = function(req, res) {
  var userId = req.session.user_id;
  var scriptId = req.body.script_id;

  dbTest.testList(userId, scriptId, function(err, data){
    if(err){
      res.send(error.db_load_error);
    }

    if(data){
      res.send({success: error.success.success, msg: error.success.msg, result: data});
    }else{
      res.send(error.unknown_error);
    }
  });
};

exports.save = function(req, res){
  var userId = req.session.user_id;
  var recordId = req.body.test_id;
  var scriptId = req.body.script_id;
  var testType = req.body.test_type;
  var testTime = req.body.test_time;
  var testScript = req.body.script_result;
  var testDate = new Date();

  console.log(userId+" "+recordId+" "+scriptId+" "+testType+" "+testTime+" "+testScript+" "+testDate);
  console.log(encodeURI(testScript));

  var preProc;

  while((preProc = testScript.match(/<ins>[^(<ins>)]*(\s)?\n<\/ins>/)) != null) {
    testScript= testScript.replace(/<ins>[^(<ins>)]*(\s)?\n<\/ins>/, preProc[0].replace('\n', ''));
  }

  console.log(recordId );
  var paragraphArr = scriptUtil.scriptToParagraphJsonArray({
    id: userId,
    script_id: scriptId,
    script_content: testScript
  });

  var score = 0;
  var wrong = 0;
  var totalMorpheme_count = 0;

  for(var i = 0; i < paragraphArr.length; i++) {
    var failWords = paragraphArr[i].content.match(/<ins>(.|\n)*?<\/ins>/g);
    console.log(failWords);
    wrong = failWords.length;

    for (var j = 0; j < failWords.length; j++) {
      paragraphArr[i].content = paragraphArr[i].content.replace(/<ins>(.|\n)*?<\/ins>/, '<location> ');
    }

    console.log(paragraphArr[i].content);
    var morpheme_array = tokenizer.tokenize(paragraphArr[i].content);
    totalMorpheme_count += morpheme_array.length;

    var wrongIdx = 0;

    for(var j = 0; j < morpheme_array.length; j++) {
      if(morpheme_array[j] === '<location>') {
        var wrongMorpheme = failWords[wrongIdx++].replace(/<(\/)?([a-zA-Z]*)(\\s[a-zA-Z]*=[^>]*)?(\\s)*(\/)?>/gi, "");
        dbTest.saveWrongMorpheme(userId, j, i, scriptId, wrongMorpheme, function (err, data) {

          if(err){
            res.send(error.db_load_error);
          }

          //if(err){
          //  res.send(error.db_load_error);
          //}
          //
          //if(data){
          //  res.send({success: error.success.success, msg: error.success.msg, result: data});
          //}else{
          //  res.send(error.unknown_error);
          //}

        });
      }
    }
  }

  score = parseInt((totalMorpheme_count-wrong)/totalMorpheme_count*100);
  dbTest.saveTest(userId, recordId, scriptId, testType, score, testDate, function(err, data){
    if(err){
      res.send(error.db_load_error);
    }

    if(data){
      res.send({success: error.success.success, msg: error.success.msg, result: data});
    }else{
      res.send(error.unknown_error);
    }
  });
}
