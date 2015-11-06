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
  var scriptId = req.query.script_id;

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
  var testId = req.body.test_id;
  var scriptId = req.body.script_id;
  var testType = req.body.test_type;
  var testTime = req.body.test_time;
  var testScript = req.body.script_result;
  var testDate = new Date();


  var paragraphArr = scriptUtil.scriptToParagraphJsonArray({
    id: userId,
    script_id: scriptId,
    script_content: testScript
  });

  var score = 0;
  var wrong = 0;
  var morpheme_count = 0;
  for(var i = 0; i < paragraphArr.length; i++){
    var morpheme_array = tokenizer.tokenize(paragraphArr[i].content);
    morpheme_count += morpheme_array.length;
    for(var j = 0; j < morpheme_array.length; j++) {

      if(morpheme_array[j].indexOf('<ins>') > -1){
        var content = morpheme_array[j].substring(5, morpheme_array[j].length-6);
        console.log(content);
        wrong+=1;
        dbTest.saveWrongMorpheme(userId, j, i, scriptId, content, function(err, data){
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

  score = parseInt((morpheme_count-wrong)/morpheme_count*100);

  dbTest.saveTest(userId, testId, scriptId, testType, score, testDate, function(err, data){
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
