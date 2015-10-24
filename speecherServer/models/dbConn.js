/**
 * Created by kimminki on 2015. 10. 12..
 */
var mongodb = require('mongodb');

var server = new mongodb.Server(
  'somalunak.cafe24.com',
  27017,
  {auto_reconnect: true, poolSize: 100});
var db = new mongodb.Db('soma', server);

module.exports = db;
