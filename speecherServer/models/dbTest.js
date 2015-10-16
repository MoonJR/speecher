/**
 * Created by kimminki on 2015. 10. 13..
 */
var db = require('./dbConn');

exports.testList = function(scriptId, callback){
  db.open(function(err, db) {
    db.collection('test', function (err, collection) {
      collection.find({"script_id":scriptId}, function (err, cursor) {
        cursor.toArray(function (err, items) {
          callback(err, items);
          db.close();
        })
      })
    });
  });
};

