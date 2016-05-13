/**
 * Created by kimminki on 2015. 10. 12..
 */

var mongodb = require('mongodb');

var ip;
var port;
var server = new mongodb.Server(
  ip,
  port,
  {auto_reconnect: true, poolSize: 100});
var db = new mongodb.Db('speecher', server);

module.exports = db;
