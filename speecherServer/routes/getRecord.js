/**
 * Created by MoonJR on 2015. 11. 3..
 */
var collection = require('../models/dbCollection');
var error = require('./error');


exports.getRecord = function (req, res) {

  var sendData = {};

  try {
    var query = {script_id: req.body.script_id};

    if (typeof query.script_id == 'undefined') {
      res.send(error.short_parameter);
      return;
    }

    var element = {record_path: true};

    collection.scriptCollection.findOne(query, element, function (err, result) {
      sendData.success = error.successCode.success;
      sendData.msg = error.successMsg.success;
      sendData.result = result;
      res.send(sendData);
    });
  } catch (e) {
    console.log(e);
    res.send(error.unknown_error);

  }


}
