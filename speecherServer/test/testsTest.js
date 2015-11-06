/**
 * Created by kimminki on 2015. 10. 15..
 */
var should = require('should');
var tests = require('../routes/tests');
var wordDetail = require('../routes/wordDetail');

describe('test', function() {
  describe('.testList(scriptId)', function() {
    it('테스트 리스트가 받아와져야한다.', function(done) {
      var scriptId = '111';
      var userId = '123';

      var req = {session:{user_id: userId}, query: {script_id: scriptId}};
      var res = {};

      res.send = function (json) {
        if (json.success == 1) {
          done();
        }
      };

      tests.testList(req, res);
    });
  });

  describe('.testSave', function() {
    it('테스트를 정보를 저장한다.', function(done) {
      var scriptId = '111';
      var userId = '123';
      var testType = 1;
      var testId = 123451111;
      var testScript = 'i am very smart <ins>and</ins> handsome\nfnfnfnfnfn <ins>eee</ins>';
      var testTime = 3;

      var req = {
        session:{user_id: userId},
        query: {
          script_id: scriptId,
          user_id: userId,
          test_type: testType,
          test_id: testId,
          test_time: testTime,
          script_result: testScript
        }};
      var res = {};

      res.send = function (json) {
        if (json.success == 1) {
          done();
        }
      };

      tests.save(req, res);
    });
  });
});
