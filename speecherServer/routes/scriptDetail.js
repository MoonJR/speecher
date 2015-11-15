/**
 * Created by kimminki on 2015. 11. 4..
 */

var dbTest = require('../models/dbTest');
var error = require('./error');

exports.failList = function(req, res){
  var userId = req.session.user_id;
  var scriptId = req.body.script_id;

  var wordLimit = 10;

  dbTest.wrongWordsInScript(userId, scriptId, wordLimit, function(err, data){
    if (err){
      res.send({success: error.db_load_error.success , msg: error.successMsg.db_load_error});
    }

    if (data) {
      res.send({success: error.success.success, msg: error.success.msg, result: data});
    } else {
      res.send({success: error.unknown_error.success, msg: error.unknown_error.msg});
    }

  });
};

exports.scriptTestNum = function(req, res) {
  var userId = req.session.user_id;
  var scriptId = req.body.script_id;

  dbTest.scriptTestNum(userId, scriptId, function(err, data){
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

exports.averageTestScore = function(req, res) {
  var userId = req.session.user_id;
  var scriptId = req.body.script_id;

  dbTest.averageTestScore(userId, scriptId, function(err, data){
    if(err) {
      res.send(error.db_load_error);
    }

    if(data){
      var scriptId = data[0]._id;
      var avgScore = Math.ceil(data[0].avgScore);
      data = {script_id: scriptId, avgScore: avgScore};
      res.send({success: error.success.success, msg: error.success.msg, result: data});
    }else{
      res.send(error.unknown_error);
    }
  });
};
