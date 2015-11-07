/**
 * Created by kimminki on 2015. 10. 15..
 */
var should = require('should');
var tests = require('../routes/tests');
var wordDetail = require('../routes/wordDetail');

describe('test', function() {
  describe('.testList(scriptId)', function() {
    it('테스트 리스트가 받아와져야한다.', function(done) {
      var scriptId = '7c8f78f0-8447-11e5-90a7-7f9032ad2b3b';
      var userId = '1730350673859952';

      var req = {session:{user_id: userId}, body: {script_id: scriptId}};
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
      var testScript = 'My <del>names </del><ins>name </ins> is  Jason thank <del>yo</del><ins>you </ins> and you\n<del>minki </del><ins>mink </ins> is genius';
      //var testScript = '<del></ins><del></ins>';
      //var testScript = 'hi my name is minki and minki good bye';
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
