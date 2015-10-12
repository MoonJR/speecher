/**
 * Created by kimminki on 2015. 10. 12..
 */
// 몽고디비 연결 담당
var mongoose = require('mongoose');
var uri = 'mongodb://somalunak.cafe24.com:27017/soma';
var options = {
  server: { poolSize : 100 }
};

var db = mongoose.createConnection(uri, options);

//에러 났을 때 처리하는 부분
db.on('error', function(err){
  if(err) throw err;
});

//정상 연결 됬을 때 처리하는 부분
db.once('open', function(){
  console.info('MongoDB connected successfully');
});

module.exports = db;
