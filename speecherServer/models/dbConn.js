/**
 * Created by kimminki on 2015. 10. 12..
 */


// 몽고디비 연결 담당
//mongoDB Connection Pool
//var mongoClient = require('mongodb').MongoClient;
//var url = 'mongodb://somalunak.cafe24.com:27017/soma';
  var mongodb = require('mongodb');

var server = new mongodb.Server(
  'somalunak.cafe24.com',
  27017,
  {auto_reconnect:true, poolSize:100});
var db = new mongodb.Db('soma', server);


//mongoClient.connect(url, function (err, connection) {
//  if (err) {
//    console.log(url + "에 연결할 수 없습니다.")
//  } else {
//    console.log(url + "에 연결 하였습니다.");
//    db = connection;
//    //var collection = db.collection('test');
//    //collection.find({}).toArray(function(err, docs) {
//    //  console.log("Found the following records");
//    //  console.dir(docs)
//    //});
//  }
//});

module.exports = db;
