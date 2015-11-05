/**
 * Created by kimminki on 2015. 10. 15..
 */
var should = require('should');
var tests = require('../routes/tests');
var wordDetail = require('../routes/wordDetail');

describe('test', function() {
  describe('.testList(scriptId)', function() {
    it('should get testList', function(done) {
      var scriptId = '111';
      var userId = '123';

      var req = {session:{user_id: userId}, query: {script_id: scriptId}};
      var res = {};

      res.send = function (json) {
        if (json.success == 1) {
          console.log(json);
          done();
        }
      };

      tests.testList(req, res);
    });
  });
});
