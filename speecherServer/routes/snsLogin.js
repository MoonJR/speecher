/**
 * Created by MoonJR on 2015. 10. 10..
 */

//mongoDB Connection Pool
var mongoClient = require('mongodb').MongoClient;
var url = 'mongodb://somalunak.cafe24.com:27017/soma';
var mongoDB = null; //mongoDB로 부터 collection 생성해서 사용하면 된다.

mongoClient.connect(url, function (err, db) {
  if (err) {
    console.log(url + "에 연결할 수 없습니다.")
  } else {
    console.log(url + "에 연결 하였습니다.");
    mongoDB = db;
  }
});

//mongoDB Connection Pool


var http = require('https');
exports.facebookLogin = function (req, res) {

  var facebookToken = req.query.token;

  getFaceBookData(facebookToken, function (response) {
    response.route = 'facebook';
    var collection = mongoDB.collection('user');

    collection.insert(response, function (err, result) {
      res.send(response);
    })

  });

};

exports.googleLogin = function (req, res) {
  var googleToken = req.query.token;

  getGooglePlusData(googleToken, function (response) {
    response.route = 'google';
    var collection = mongoDB.collection('user');

    collection.insert(response, function (err, result) {
      res.send(response);
    })

  });
};


function getFaceBookData(token, varFunction) {
  var url = 'https://graph.facebook.com/me?fields=email,name&access_token=' + token;
  http.get(url, function (res) {
    var body = '';

    res.on('data', function (chunk) {
      body += chunk;
    });

    res.on('end', function () {
      var fbResponse = JSON.parse(body);
      varFunction(fbResponse);
    });
  }).on('error', function (e) {
    console.log("Got an error: ", e);
  });
};

function getGooglePlusData(token, varFunction) {
  var url = 'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + token;
  http.get(url, function (res) {
    var body = '';

    res.on('data', function (chunk) {
      body += chunk;
    });

    res.on('end', function () {
      var fbResponse = JSON.parse(body);
      varFunction(fbResponse);
    });
  }).on('error', function (e) {
    console.log("Got an error: ", e);
  });
};



