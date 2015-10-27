/**
 * Created by MoonJR on 2015. 10. 20..
 */
var db = require('./dbConn');

exports.login = function (respone, callback) {
  db.open(function (err, db) {
    db.collection('user', function (err, collection) {
      collection.insert(respone, function (err, result) {
        callback(err, respone);
        db.close();
      })
    });
  });
};

