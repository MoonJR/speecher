/**
 * Created by kimminki on 2015. 10. 15..
 */
var should = require('should');
var dbTest = require('../models/dbTest');

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
      var sampleData;
      it('데이터가 제대로 불러와지는지 확인', function(done) {
        var scriptId = 1;
        var wordLimit = 10;
        dbTest.wrongWordsInScript(scriptId, 10, function(err, data){
          data.should.be.object;
          sampleData = data;
          done();
        });
      });
    it('불러온 데이터가 정보가 맞는지 확인', function(done) {
      //var scriptId = 1;
      //var wordLimit = 10;
      //dbTest.wrongWordsInScript(scriptId, 10, function(err, data){
      //  data.should.be.object;
      //  sampleData.shou;
      //  done();
      //});
    });
  });
  describe('.totalFailWord(scriptId)', function() {
    it('모든 틀린 형태소에 대한 데이터가 받아와져야 한다.', function(done) {
      //var user_id =
      var wordLimit = 10;
      dbTest.totalFailWord(user_id, wordLimit, function(err, data){
        data.should.be.object;
        done();
      });
    });
  });
  
  describe('.wrongWordDetail(scriptId)', function() {
    it('should confirm failList data type', function(done) {
      var scriptId = 1;
      var wordLimit = 10;
      dbTest.wrongWordsInScript(scriptId, 10, function(err, data){
        data.should.be.object;
        done();
      });
    });
  });
});
