/**
 * Created by kimminki on 2015. 11. 4..
 */

var main = require('../routes/main');

describe('main', function() {

  describe('.totalFailList(scriptId)', function() {
    var req = {query: {}, session: {user_id: '885722828163340'}};
    var res = {};

    it('모든 틀린 형태소에 대한 데이터가 받아와져야 한다.', function (done) {
      var script = 'Script.';
      res.send = function (json) {
        if (json.success == 1) {
          done();
        }
      };

      main.totalFailList(req, res);
    });

    it('가장 많이 틀린 데이터가 영어 단어인지 확인해본다.', function(done) {
      var script = 'Script.';
      res.send = function (json) {
        if (json.success == 1) {
          if(json.result[0]._id == script){
            done();
          }
        }
      };

      main.totalFailList(req, res);
    });
  });

  describe('.wrongWordDetail(scriptId)', function() {
    var word = 'wind';
    var req = {query: {word: word}};
    var res = {};
    it('틀린 형태소 상세 데이터 불러오기', function (done) {

      res.send = function (json) {
        if (json.success == 1) {
          done();
        }
      };

      main.wordDetail(req, res);
      //wɪnd
    });

    it('발음 기호 맞는지 확인', function (done) {

      res.send = function (json) {
        if (json.success == 1) {
          if(json.result.pronunciation.all === 'wɪnd'){
            done();
          }
        }
      };

      main.wordDetail(req, res);
    });
  });
});
