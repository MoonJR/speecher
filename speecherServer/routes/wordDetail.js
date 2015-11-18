/**
 * Created by kimminki on 2015. 10. 23..
 */

var unirest = require('unirest');

exports.wordDetailData = function wordDetailData(word, callback) {

  unirest.get("https://wordsapiv1.p.mashape.com/words/" + word + "/pronunciation")
    .header("X-Mashape-Key", "Ts7OIrZgaNmshsP20MhtKUfunFNZp1dDOpBjsnCuuu2C7LROLo")
    .header("Accept", "application/json")
    .end(function (result) {
      try{
        if (result.status == 200) {
          callback(false, result.body);
        }else {
          throw e;
        }
      }catch(e){
        callback(true,0);
      }


    });


};
