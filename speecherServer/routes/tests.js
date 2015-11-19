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
    }else{
      if(data){
        res.send({success: error.success.success, msg: error.success.msg, result: data});
      }else{
        res.send(error.unknown_error);
      }
    }
  });
};

exports.save = function(req, res){
  var userId = req.session.user_id;
  var recordFilename = req.body.filename;
  var scriptId = req.body.script_id;
  var testType = req.body.test_type;
  var testTime = req.body.test_time;
  var testScript = req.body.script_result;
  var testDate = new Date();

  var preProc;
  var originTestScript = testScript;

  //console.log(testScript);
  while((preProc = testScript.match(/<ins>[^<]*(\s)*\n<\/ins>/)) != null) {
    testScript= testScript.replace(/<ins>[^<)]*(\s)*\n<\/ins>/, preProc[0].replace('\n', ''));
  }

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

    wrong = failWords.length;

    for (var j = 0; j < failWords.length; j++) {
      paragraphArr[i].content = paragraphArr[i].content.replace(/<ins>(.|\n)*?<\/ins>/, '<location> ');
    }

    var morpheme_array = tokenizer.tokenize(paragraphArr[i].content);
    totalMorpheme_count += morpheme_array.length;

    var wrongIdx = 0;

    dbTest.saveWrongMorpheme(userId, morpheme_array, i, scriptId, failWords, function (err, data) {
      if(err){
        console.log(err);
        res.send(error.db_load_error);
      }
    });
  }

  score = parseInt((totalMorpheme_count-wrong)/totalMorpheme_count*100);

  dbTest.saveTest(userId, recordFilename, scriptId, testType, score, testDate, originTestScript, function(err, data){
    if(err){
      res.send(error.db_load_error);
    }else{
      if(data.result.ok==1){
        res.send({success: error.success.success, msg: error.success.msg, result: {score:score}});
      }else{
        res.send(error.unknown_error);
      }
    }


  });
}