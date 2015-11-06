/**
 * Created by kimminki on 2015. 10. 27..
 */

var dbTest = require('../models/dbTest');
var wordDetail = require('./wordDetail');
var error = require('./error');

exports.totalFailList = function(req, res) {
  var user_id = req.session.user_id;
  var wordLimit = 10;

  dbTest.totalFailWord(user_id, wordLimit, function (err, data) {

    if (err){
      res.send({success: error.db_load_error.success , msg: error.db_load_error.msg});
    }

    if (data) {
      res.send({success: error.successCode.success, msg: error.successMsg.success, result: data});
    } else {
      res.send({success: error.unknown_error.success, msg: error.unknown_error.msg});
    }
  });

};

exports.wordDetail = function(req, res) {
  var word = req.body.word;

  wordDetail.wordDetailData(word, function (err, data) {

    if (err){
      res.send(error.db_load_error);
    }

    if (data) {
      res.send({success: error.success.success, msg: error.success.msg, result: data});
    } else {
      res.send(error.unknown_error);
    }

  });
};
