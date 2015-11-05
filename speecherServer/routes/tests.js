/**
 * Created by kimminki on 2015. 10. 12..
 */
var dbTest = require('../models/dbTest');
var error = require('../routes/error');

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
