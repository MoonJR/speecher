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
  //describe('.failList(scriptId)', function() {
  //  it('should get testList', function(done) {
  //    var scriptId = 1;
  //    dbTest.testList(scriptId, function(err, data){
  //      should.equal(data[0].test_id, 1111);
  //      done();
  //    });
  //  });
  //});
});
