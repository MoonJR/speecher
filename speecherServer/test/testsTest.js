/**
 * Created by kimminki on 2015. 10. 15..
 */
var should = require('should');
var dbTest = require('../models/dbTest');
var wordDetail = require('../routes/wordDetail');

describe('dbTest', function() {
  describe('.testList(scriptId)', function() {
    it('should get testList', function(done) {
      var scriptId = 1;
      dbTest.testList(scriptId, function(err, data){
        should.equal(data[0].test_id, 1111);
        done();
      });
    });
  });
  describe('.failList(scriptId)', function() {
    var scriptId = 1;
    var wordLimit = 10;
      it('데이터가 제대로 불러와지는지 확인', function(done) {

        dbTest.wrongWordsInScript(scriptId, 10, function(err, data){
          data.should.be.object;
          sampleData = data;
          done();
        });
      });
    it('불러온 데이터가 정보가 맞는지 확인', function(done) {
      dbTest.wrongWordsInScript(scriptId, 10, function(err, data){
        data.should.be.object;
        sampleData.shou;
        done();
      });
    });
  });
  describe('.totalFailWord(scriptId)', function() {
    var testWord = 'area';
    var user_id = 1;
    var wordLimit = 10;
    it('모든 틀린 형태소에 대한 데이터가 받아와져야 한다.', function(done) {
      dbTest.totalFailWord(user_id, wordLimit, function(err, data){
        data.should.be.object;
        done();
      });
    });
    it('가장 많이 틀린 데이터가 영어 단어인지 확인해본다.', function(done) {
      dbTest.totalFailWord(user_id, wordLimit, function(err, data){
        data[0].content.should.equal(testWord);
        done();
      });
    });
  });

  describe('.wrongWordDetail(scriptId)', function() {
    var word = 'wind';
    it('틀린 형태소 상세 데이터 불러오기', function(done) {
      wordDetail.wordDetailData(word, function(err, data){
        data.should.be.object;
        done();
      });
      //wɪnd
    });

    it('발음 기호 맞는지 확인', function(done) {
      wordDetail.wordDetailData(word, function(err, data){
        'wɪnd'.should.equal(data.pronunciation.all);
        done();
      });
    });


  });
});
