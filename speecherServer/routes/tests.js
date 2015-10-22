/**
 * Created by kimminki on 2015. 10. 12..
 */
var express = require('express');
var router = express.Router();
var dbTest = require('../models/dbTest');
var wordDetail = require('./wordDetail');

/* GET users listing. */
router.get('/testList', function(req, res) {
  var scriptId = Number(req.query.script_id);

  dbTest.testList(scriptId, function(err, data){
    if(err) throw err;
    if(data){
      res.json({ success:1, msg:"성공적으로 수행되었습니다.", result:data });
    }else{
      res.json({ success:0, msg:"수행도중 에러가 발생했습니다." });
    }
  });
});

router.get('/scriptDetail/failList', function(req, res){
  var scriptId = Number(req.query.script_id);
  var wordLimit = 10;

  dbTest.wrongWordsInScript(scriptId, wordLimit, function(err, data){
    if(err) throw err;
    if(data){
      res.json({ success:1, msg:"성공적으로 수행되었습니다.", result:data });
    }else{
      res.json({ success:0, msg:"수행도중 에러가 발생했습니다." });
    }
  });
});

router.get('/main/totalFailList', function(req, res) {
  //나중에 세션에 저장하는 코드랑 맞춰야함 네이밍
  var user_id = req.session.userData.user_id;
  var wordLimit = 10;

  dbTest.totalFailWord(user_id, wordLimit, function (err, data) {

    if (err) throw err;
    if (data) {
      res.json({success: 1, msg: "성공적으로 수행되었습니다.", result: data});
    } else {
      res.json({success: 0, msg: "수행도중 에러가 발생했습니다."});
    }
  });
});

router.get('/main/wordDetail', function(req, res) {
  //나중에 세션에 저장하는 코드랑 맞춰야함 네이밍
  var word = req.query.word;
  wordDetail.wordDetailData(word, function (err, data) {

    if (err) throw err;
    if (data) {
      res.json({success: 1, msg: "성공적으로 수행되었습니다.", result: data});
    } else {
      res.json({success: 0, msg: "수행도중 에러가 발생했습니다."});
    }
  });
});

module.exports = router;
