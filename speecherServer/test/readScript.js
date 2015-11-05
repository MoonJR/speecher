/**
 * Created by MoonJR on 2015. 10. 21..
 */
/**
 * Created by MoonJR on 2015. 10. 14..
 */
var readScript = require('../routes/readScript');
describe('script', function () {
  describe('#scriptList read()', function () {
    var id = '6I-QbFY1ItOkrBiQFHaOgZaXodnyf_46';
    var script_id = '5e89c6c0-771e-11e5-8d15-f1339b6c4e73';
    this.timeout(10000);
    it('db에서 스크립트 리스트 불러오기', function (done) {

      setTimeout(function () {
        //목 만들기
        var req = {body: {}};

        req.body.id = id;
        req.body.script_id = script_id;

        var res = {};
        res.send = function (json) {
          if (json.success == 1) {
            done();
          }
        };

        readScript.readScriptList(req, res);

      }, 3000);

    });

    it('db에서 특정 대본 불러오기', function (done) {

      setTimeout(function () {
        //목 만들기
        var req = {query: {}};

        req.body.id = id;
        req.body.script_id = script_id;

        var res = {};
        res.send = function (json) {
          if (json.success == 1) {
            done();
          }
        };

        readScript.readScriptList(req, res);

      }, 100);

    });

    it('db에서 특정 대본 문단별 불러오기', function (done) {

      setTimeout(function () {
        //목 만들기
        var req = {query: {}};

        req.body.id = id;
        req.body.script_id = script_id;

        var res = {};
        res.send = function (json) {
          if (json.success == 1) {
            done();
          }
        };

        readScript.readParagraph(req, res);

      }, 100);

    });


  });


});


