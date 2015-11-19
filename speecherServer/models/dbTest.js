/**
 * Created by kimminki on 2015. 10. 13..
 */
var db = require('./dbConn');

exports.testList = function (userId, scriptId, callback) {
  db.open(function (err, db) {
    db.collection('test', function (err, collection) {
      collection.find({"id": userId, "script_id": scriptId}, function (err, cursor) {
        cursor.toArray(function (err, items) {
          callback(err, items);
        })
      })
    });
  });
};

exports.wrongWordsInScript = function (userId, scriptId, wordLimit, callback) {
  db.open(function (err, db) {
    db.collection('morpheme', function (err, collection) {
      collection.aggregate([
        {$match: {id: userId, script_id: scriptId}},
        {$group: {"_id": "$content", wrongCount: {$sum: "$wrongCount"}}},
        {$sort: {wrongCount: -1}}]).toArray(function (err, result) {
        callback(err, result);
      });
    });
  });
};

exports.totalFailWord = function (user_id, wordLimit, callback) {
  db.open(function (err, db) {
    db.collection('morpheme', function (err, collection) {
      collection.aggregate(
          [
            { $match: { "id": user_id}},
            { $group: { "_id": "$content", wrongCount: {$sum : "$wrongCount"}}},
            { $sort: {wrongCount: -1}},
            { $limit: wordLimit}
          ]
      ).toArray(function(err, result) {
            callback(err,result);
          });
    });
  });
}


exports.saveTest = function(userId, recordFilename, scriptId, testType, score, testDate, testScript, callback){
  db.open(function(err, db) {
    db.collection('test', function (err, collection) {
      collection.insertOne({
            id: userId,
            recordFilename: recordFilename,
            script_id: scriptId,
            test_type: testType,
            score: score,
            test_date: testDate,
            test_script: testScript
          },
          function (err, result) {
            callback(err, result);
          })
    });
  });
}

exports.saveWrongMorpheme = function(user_id, morpheme_array, paragraph_id, script_id, fallWords, callback){

  var wrongIdx = 0;
  db.open(function(err, db) {
    var collection = db.collection('morpheme');
    var bulk = collection.initializeUnorderedBulkOp({useLegacyOps: true});
    for (var j = 0; j < morpheme_array.length; j++) {
      if (morpheme_array[j] === '<location>') {
        //var wrongMorpheme = fallWords[wrongIdx++].replace(/<(\/)?([a-zA-Z]*)(\\s[a-zA-Z]*=[^>]*)?(\\s)*(\/)?>/gi, "");
        var wrongMorpheme = fallWords[wrongIdx++].replace(/<(\/)?([a-zA-Z]*)(\\s[a-zA-Z]*=[^>]*)?(\\s)*(\/)?>/gi, "");
        wrongMorpheme = wrongMorpheme.replace(/[^(a-zA-Z]/, "");
        var key = user_id + "|" + script_id +"|"+ paragraph_id + "|" + j;

        bulk.find({_id: key}).upsert().updateOne({
          $setOnInsert: {
            id: user_id,
            script_id: script_id,
            paragraph_seq: paragraph_id,
            morpheme_seq: j,
            content: wrongMorpheme
          },
          $inc : {wrongCount:1}
        });
      }
    }
    bulk.execute(function(err, result){
      callback(err, result);
    });
  });
}

exports.scriptTestNum = function(userId, scriptId, callback){
  db.open(function(err, db) {
    db.collection('test', function (err, collection) {
      collection.find({"id": userId, "script_id": scriptId}).count(function (err, result) {
        callback(err, result);
      });
    });
  });
}

exports.averageTestScore = function(userId, scriptId, callback){
  db.open(function(err, db) {
    db.collection('test', function (err, collection) {
      collection.aggregate([
        {$match: {id: userId, script_id: scriptId}},
        {$group: {_id: "$script_id", avgScore: { $avg: "$score" }}}
      ], function (err, result) {
        callback(err, result);
      });
    });
  });
}

exports.testScoreList = function(userId, callback){
  db.open(function(err, db) {
    db.collection('test', function (err, collection) {
      collection.aggregate([
        {$match: {id: userId}},
        {$group: {_id: "$script_id", avgScore: { $avg: "$score" }, testCount: { $sum: 1}}}
      ], function (err, result) {
        callback(err, result);
      });
    });
  });
}