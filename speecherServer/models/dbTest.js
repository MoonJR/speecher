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
      });
    });
  });
}

exports.saveTest = function(userId, testId, scriptId, testType, score, testDate, callback){
  db.open(function(err, db) {
    db.collection('test', function (err, collection) {
      collection.insertOne({
          id: userId,
          test_id: testId,
          script_id: scriptId,
          test_type: testType,
          score: score,
          test_date: testDate
        },
        function(err, result) {
          callback(err, result);
      })
    });
  });
}

exports.saveWrongMorpheme = function(user_id, morpheme_id, paragraph_id, script_id, content, callback){
  var key = user_id+ "l" +paragraph_id+ "l" + morpheme_id;
  db.open(function(err, db) {
    db.collection('morpheme', function (err, collection) {
      collection.insert({
        _id: key,
        id: user_id,
        script_id: script_id,
        paragraph_seq: paragraph_id,
        morpheme_seq: morpheme_id,
        content: content,
        wrongCount: 1
      },function(err, result){

        if(err){
          collection.update({
            _id: key
          },{$inc:{wrongCount:1}});
        }

        callback(err, result);
      });
    });
  });
}
