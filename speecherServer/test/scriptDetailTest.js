/**
 * Created by kimminki on 2015. 11. 5..
 */

var should = require('should');
var scriptDetail = require('../routes/scriptDetail');

describe('test', function() {
  describe('.failList', function () {

    var userId = "901469693283252";
    var scriptId = "c9b94500-891c-11e5-aff9-c925ff76a418";

    it('데이터가 제대로 불러와지는지 확인', function (done) {
      var req = {session: {user_id: userId}, body: {script_id: scriptId}};
      var res = {};

      res.send = function (json) {
        if (json.success == 1) {
          console.log(json);
        }
      };

      scriptDetail.failList(req, res);
    });

    it('불러온 데이터가 정보가 맞는지 확인', function (done) {

      var req = {session:{ user_id: userId}, body: {script_id: scriptId}};
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

  describe('.scriptTestNum(scriptId)', function() {
    it('스크립트 당 테스트 갯수를 가져온다..', function(done) {
      var scriptId = 'f176e260-88d5-11e5-abe2-81005e88d990';
      var userId = '1730350673859952';

      var req = {session:{user_id: userId}, body: {script_id: scriptId}};
      var res = {};

      res.send = function (json) {
        if (json.success == 1) {
          console.log(json);
          done();
        }
      };

      scriptDetail.scriptTestNum(req, res);
    });
  });


  describe('.averageTestScore(scriptId)', function() {
    it('테스트 점수 평균이 받아와져야한다.', function(done) {
      var scriptId = 'fbe22d00-8924-11e5-8dc3-219951de5373';
      var userId = '885722828163340';

      var req = {session:{user_id: userId}, body: {script_id: scriptId}};
      var res = {};

      res.send = function (json) {
        if (json.success == 1) {
          console.log(json);
          done();
        }
      };

      scriptDetail.averageTestScore(req, res);
    });
  });


});
