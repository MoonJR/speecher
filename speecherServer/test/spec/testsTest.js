/**
 * Created by kimminki on 2015. 10. 15..
 */
var should = require('should');
var dbTest = require('../../models/dbTest');

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
      it('should confirm failList data type', function(done) {
        var scriptId = 1;
        var wordLimit = 10;
        dbTest.wrongWordsInScript(scriptId, 10, function(err, data){
          data.should.be.object;
          done();
        });
      });
  });
  describe('.totalFailWord(scriptId)', function() {
    it('should confirm failList data type', function(done) {
      var scriptId = 1;
      var wordLimit = 10;
      dbTest.wrongWordsInScript(scriptId, 10, function(err, data){
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
