/**
 * Created by MoonJR on 2015. 10. 24..
 */
var testHistory = require('../routes/testHistory');
describe('testHistory', function () {
  describe('#testHistroy read()', function () {
    var id = '123';
    var script_id = '111';
    this.timeout(10000);
    it('db에서 테스트 리스트 불러오기', function (done) {

      setTimeout(function () {
        //목 만들기
        var req = {query: {}};

        req.query.id = id;
        req.query.script_id = script_id;

        var res = {};
        res.send = function (json) {
          if (json.success == 1) {
            done();
          }
        };

        testHistory.testHistory(req, res);

      }, 3000);

    });


  });


});


