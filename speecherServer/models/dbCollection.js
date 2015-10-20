/**
 * Created by MoonJR on 2015. 10. 20..
 */
//mongoDB Connection Pool
var mongoClient = require('mongodb').MongoClient;
var url = 'mongodb://somalunak.cafe24.com:27017/soma';
var mongoDB = null; //mongoDB로 부터 collection 생성해서 사용하면 된다.

var scriptCollection;
var paragraphCollection;
var morphemeCollection;


mongoClient.connect(url, function (err, db) {
  if (err) {
    console.log(url + "에 연결할 수 없습니다.")
  } else {
    console.log(url + "에 연결 하였습니다.");
    mongoDB = db;

    exports.scriptCollection = mongoDB.collection('script');
    exports.paragraphCollection = mongoDB.collection('paragraph');
    exports.morphemeCollection = mongoDB.collection('morpheme');
  }
});


//mongoDB Connection Pool
