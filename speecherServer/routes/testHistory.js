/**
 * Created by MoonJR on 2015. 10. 24..
 */
var collection = require('../models/dbCollection');

exports.testHistory = function (req, res) {

  var query = {
    id: req.query.id,
    script_id: req.query.script_id
  };

  var sendData = {};

  collection.testCollection.find(query).toArray(function (err, result) {
    if (err || result == null) {
      sendData.success = 0;
    } else {
      sendData.success = 1;
    }
    sendData.result = result;
    res.send(sendData);

  });
};