/**
 * Created by kimminki on 2015. 11. 5..
 */

var should = require('should');
var scriptDetail = require('../routes/scriptDetail');

describe('test', function() {
  describe('.failList', function () {

    var userId = "885722828163340";
    var scriptId = "292258a0-7ff5-11e5-b4a9-dbe441537346";

    it('데이터가 제대로 불러와지는지 확인', function (done) {
      var req = {session: {user_id: userId}, query: {script_id: scriptId}};
      var res = {};

      res.send = function (json) {
        if (json.success == 1) {
          done();
        }
      };

      scriptDetail.failList(req, res);
    });

    it('불러온 데이터가 정보가 맞는지 확인', function (done) {

      var req = {session:{ user_id: userId}, query: {script_id: scriptId}};
      var res = {};

      res.send = function (json) {
        if (json.success == 1) {
          if(json.result[0].content === 'Script.'){
            done();
          }
        }
      };

      scriptDetail.failList(req, res);
    });
  });
});
