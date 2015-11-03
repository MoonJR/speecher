/**
 * Created by kimminki on 2015. 10. 12..
 */
var dbTest = require('../models/dbTest');

/* GET users listing. */
exports.testList = function(req, res) {
  var scriptId = Number(req.query.script_id);

  dbTest.testList(scriptId, function(err, data){
    if(err) throw err;
    if(data){
      res.json({ success:1, msg:"성공적으로 수행되었습니다.", result:data });
    }else{
      res.json({ success:0, msg:"수행도중 에러가 발생했습니다." });
    }
  });
};
