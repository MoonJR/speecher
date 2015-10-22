/**
 * Created by MoonJR on 2015. 10. 20..
 */
//mongoDB Connection Pool
var mongoClient = require('mongodb').MongoClient;
var url = 'mongodb://somalunak.cafe24.com:27017/soma';

mongoClient.connect(url, function (err, db) {
  if (err) {
    console.log(url + "에 연결할 수 없습니다.")
  } else {
    console.log(url + "에 연결 하였습니다.");

    exports.scriptCollection = db.collection('script');
    exports.paragraphCollection = db.collection('paragraph');
    exports.morphemeCollection = db.collection('morpheme');
  }
});


//mongoDB Connection Pool
