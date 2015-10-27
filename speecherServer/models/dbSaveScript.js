/**
 * Created by MoonJR on 2015. 10. 20..
 */
var db = require('./dbConn');

exports.saveScript = function (date, callback) {
  db.open(function (err, dbTmp1) {
    dbTmp1.collection('script', function (err, collection) {
      collection.insert(date, function (err, result) {
        callback(err, result);
        dbTmp1.close();
      })
    });
  });
};

exports.saveParagraph = function (date, callback) {
  db.open(function (err, dbTmp2) {
    dbTmp2.collection('paragraph', function (err, collection) {
      collection.insert(date, function (err, result) {
        console.log("test");
        callback(err, result);
        dbTmp2.close();
      })
    });
  });
};


exports.saveMorpheme = function (date, callback) {
  db.open(function (err, dbTmp3) {
    dbTmp3.collection('morpheme', function (err, collection) {
      collection.insert(date, function (err, result) {
        callback(err, result);
        dbTmp3.close();
      })
    });
  });
};

