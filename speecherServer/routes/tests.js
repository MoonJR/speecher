/**
 * Created by kimminki on 2015. 10. 12..
 */
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://somalunak.cafe24.com:27017/soma'); // 기본 설정에 따라 포트가 상이 할 수 있습니다.
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("mongo db connection OK.");
});

var testSchema = mongoose.Schema({
  test_id: NUMBER,
  script_id: NUMBER,
  test_type: NUMBER,
  score: NUMBER,
  test_date: DATE
});

var Click = db.model('test', testSchema);
console.log(testIns.name); // "testIns"

/* GET users listing. */
router.get('/testList', function(req, res) {
  var test_id = req.query.test_id;

  res.send(test_id);
});

module.exports = router;
