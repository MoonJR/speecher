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
      var scriptId = 'fbe22d00-8924-11e5-8dc3-219951de5373';
      var userId = '885722828163340';
      var testType = "대본읽기";//
      var filename = "d48e2250-8928-11e5-8dc3-219951de5373.wav";//
      var testScript = '<ins>Test </ins><ins>Test \n</ins>';
      //var testScript = '<del></ins><del></ins>';
      //var testScript = 'hi my name is minki and minki good bye';
      var testTime = 1;

      var req = {
        session:{user_id: userId},
        body: {
          script_id: scriptId,
          user_id: userId,
          test_type: testType,
          filename: filename,
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
