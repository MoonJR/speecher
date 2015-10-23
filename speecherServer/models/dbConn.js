/**
 * Created by kimminki on 2015. 10. 12..
 */
<<<<<<< HEAD


// 몽고디비 연결 담당
//mongoDB Connection Pool
//var mongoClient = require('mongodb').MongoClient;
//var url = 'mongodb://somalunak.cafe24.com:27017/soma';
=======
>>>>>>> master
var mongodb = require('mongodb');

var server = new mongodb.Server(
  'somalunak.cafe24.com',
  27017,
  {auto_reconnect: true, poolSize: 100});
var db = new mongodb.Db('soma', server);

module.exports = db;
