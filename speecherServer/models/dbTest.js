/**
 * Created by kimminki on 2015. 10. 13..
 */
var db = require('./dbConn');

exports.testList = function(userId, scriptId, callback){

  db.open(function(err, db) {
    db.collection('test', function (err, collection) {
      collection.find({"id":userId, "script_id":scriptId}, function (err, cursor) {
        cursor.toArray(function (err, items) {
          callback(err, items);
          db.close();
        })
      })
    });
  });
};

exports.wrongWordsInScript = function(userId, scriptId, wordLimit, callback){

  db.open(function(err, db) {
    db.collection('morpheme', function (err, collection) {
      collection.find({"id": userId, "script_id":scriptId}).limit(wordLimit).sort({wrongCount:-1}).toArray(function (err, items) {
          callback(err, items);
          db.close();
      })
    });
  });
};

exports.totalFailWord = function(user_id, wordLimit, callback){
  db.open(function(err, db) {
    db.collection('morpheme', function (err, collection) {
      collection.aggregate(
        [
          { $group: { "_id": "$content", wrongCount: {$sum : "$wrongCount"}}},
          { $sort: {wrongCount: -1}},
          { $limit: 10}
        ]
      ).toArray(function(err, result) {
          callback(err,result);
          db.close();
      });
    });
  });
}
