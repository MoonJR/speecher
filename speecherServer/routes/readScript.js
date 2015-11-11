/**
 * Created by MoonJR on 2015. 10. 20..
 */
var collection = require('../models/dbCollection');
var error = require('./error');

exports.readScriptList = function (req, res) {
  var sendData = {};
  try {
    var query = {
      id: req.session.user_id
    };

    if (typeof query.id == 'undefined') {
      res.send(error.no_session);
      return;
    }
    ;


    collection.scriptCollection.find(query).sort({reg_date: -1}).toArray(function (err, result) {
      if (err || result == null) {
        res.send(error.db_load_error);
        return;
      } else {
        sendData.success = error.successCode.success;
        sendData.msg = error.successMsg.success;
      }
      sendData.result = result;
      res.send(sendData);
    });
  } catch (e) {
    console.log(e);
    res.send(error.unknown_error);
  }

};

exports.readScriptDetail = function (req, res) {
  var sendData = {};
  try {
    var query = {
      id: req.session.user_id,
      script_id: req.body.script_id
    };
    if (typeof query.id == 'undefined') {
      res.send(error.no_session);
      return;
    } else if (typeof query.script_id == 'undefined') {
      res.send(error.short_parameter);
      return;
    }


    collection.scriptCollection.findOne(query, function (err, result) {
      if (err || result == null) {
        res.send(error.db_load_error);
        return;
      } else {
        sendData.success = error.successCode.success;
        sendData.msg = error.successMsg.success;
      }
      sendData.result = result;
      res.send(sendData);
    });

  } catch (e) {
    console.log(e);
    res.send(error.unknown_error);
  }
};

exports.readParagraph = function (req, res) {
  var sendData = {};
  try {
    var query = {
      script_id: req.body.script_id
    };
    if (typeof req.session.user_id == 'undefined') {
      res.send(error.no_session);
      return;
    } else if (typeof query.script_id == 'undefined') {
      res.send(error.short_parameter);
      return;
    }

    collection.paragraphCollection.find(query).toArray(function (err, result) {
      if (err || result == null) {
        res.send(error.db_load_error);
        return;
      } else {
        sendData.success = error.successCode.success;
        sendData.msg = error.successMsg.success;
      }
      sendData.result = result;
      res.send(sendData);
    });

  } catch (e) {
    console.log(e);
    res.send(error.unknown_error);
  }
};




