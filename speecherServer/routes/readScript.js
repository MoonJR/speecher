/**
 * Created by MoonJR on 2015. 10. 20..
 */
var collection = require('../models/dbCollection');

exports.readScriptList = function (req, res) {

  var query = {
    id: req.query.id,
    script_id: req.query.script_id
  };
  var sendData = {};

  collection.scriptCollection.find(query).toArray(function (err, result) {
    if (err) {
      sendData.success = 0;
      sendData.result = result;
    } else {
      sendData.success = 1;
      sendData.result = result;
    }

    res.send(sendData);
  });

}

exports.readScriptDetail = function (req, res) {

  var query = {
    id: req.query.id,
    script_id: req.query.script_id
  };
  var sendData = {};


  collection.scriptCollection.findOne(query, function (err, result) {
    if (err) {
      sendData.success = 0;
      sendData.result = result;
    } else {
      sendData.success = 1;
      sendData.result = result;
    }

    res.send(sendData);
  });


}





