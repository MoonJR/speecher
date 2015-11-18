/**
 * Created by kimminki on 2015. 10. 23..
 */

var unirest = require('unirest');

exports.wordDetailData = function wordDetailData(word, callback) {

  try {
    unirest.get("https://wordsapiv1.p.mashape.com/words/" + word + "/pronunciation")
      .header("X-Mashape-Key", "Ts7OIrZgaNmshsP20MhtKUfunFNZp1dDOpBjsnCuuu2C7LROLo")
      .header("Accept", "application/json")
      .end(function (result) {
        if (result.status == 200) {
          callback(false, result.body);
        }
        else {
          callback(true, 0);
        }
      });
  }catch(e){

  }finally{
    callback(true, 0);
  }

};
