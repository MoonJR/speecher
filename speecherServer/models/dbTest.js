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
      collection.find({"user_id":user_id}).limit(wordLimit).sort({wrongCount:-1}).toArray(function (err, items) {
        callback(err, items);
        db.close();
      })
    });
  });
}

//exports.wrongWordDetail = function(word, callback){
//
//     unirest.get("https://wordsapiv1.p.mashape.com/words/{word}/examples")
//    .header("X-Mashape-Key", "Ts7OIrZgaNmshsP20MhtKUfunFNZp1dDOpBjsnCuuu2C7LROLo")
//    .header("Accept", "application/json")
//    .end(function (result) {
//      console.log(result.status, result.headers, result.body);
//    });
//}
