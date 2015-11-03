/**
 * Created by kimminki on 2015. 11. 4..
 */


exports.failList = function(req, res){
  var scriptId = Number(req.query.script_id);
  var wordLimit = 10;

  dbTest.wrongWordsInScript(scriptId, wordLimit, function(err, data){
    if(err) throw err;
    if(data){
      res.json({ success:1, msg:"성공적으로 수행되었습니다.", result:data });
    }else{
      res.json({ success:0, msg:"수행도중 에러가 발생했습니다." });
    }
  });
};
