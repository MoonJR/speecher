/**
 * Created by MoonJR on 2015. 10. 21..
 */
/**
 * Created by MoonJR on 2015. 10. 14..
 */
var deleteScript = require('../routes/deleteScript');
describe('script', function () {
  describe('#scriptList read()', function () {
    var script_id = '78662440-805a-11e5-962a-7ba6bfff42d2';
    this.timeout(10000);
    it('db에서 스크립트 리스트 제거하기', function (done) {

      setTimeout(function () {
        //목 만들기
        var req = {body: {}};

        req.body.script_id = script_id;

        var res = {};
        res.send = function (json) {
          if (json.success == 1) {
            done();
          }
        };

        deleteScript.deleteScriptExpress(req, res);

      }, 3000);

    });


  });


});


