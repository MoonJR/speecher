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

exports.wrongWordsInScript = function(scriptId, wordLimit, callback){
  console.log(scriptId);
  console.log(wordLimit);

  db.open(function(err, db) {
    db.collection('morpheme', function (err, collection) {
      collection.find({"script_id":scriptId}).limit(wordLimit).sort({wrongCount:-1}).toArray(function (err, items) {
          callback(err, items);
          db.close();
      })
    });
  });
};

exports.totalFailWord = function(user_id, wordLimit, callback){
  db.open(function(err, db) {
    db.collection('morpheme', function (err, collection) {
      collection.find({}).limit(wordLimit).sort({wrongCount:-1}).toArray(function (err, items) {
        callback(err, items);
        db.close();
      })
    });
  });
}

//테스트 폼에 따라 변경 필요
exports.saveTest = function(user_id, script_id, paragraph_id, callback){
  //db.open(function(err, db) {
  //  db.collection('record', function (err, collection) {
  //    collection.find({}).limit(wordLimit).sort({wrongCount:-1}).toArray(function (err, items) {
  //      callback(err, items);
  //      db.close();
  //    })
  //  });
  //});
}
