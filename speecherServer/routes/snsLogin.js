/**
 * Created by MoonJR on 2015. 10. 10..
 */


var db = require('../models/dbSnsLogin');


var http = require('https');
exports.facebookLogin = function (req, res) {

  var facebookToken = req.query.token;

  getFaceBookData(facebookToken, function (response) {
    response.route = 'facebook';
    response.id = 11111;

    var resData = {};
    resData.response = response;

    if (typeof response.id != 'undefined') {
      db.login(response, function (err, result) {
        resData.success = 1;
        res.send(resData);
      });
    } else {
      resData.success = 0;
      res.send(resData)
    }


  });

};

exports.googleLogin = function (req, res) {
  var googleToken = req.query.token;

  getGooglePlusData(googleToken, function (response) {
    response.route = 'google';

    var resData = {};
    resData.response = response;

    if (typeof response.id != 'undefined') {
      db.login(response, function (err, result) {
        resData.success = 1;
        res.send(resData);
      });
    } else {
      resData.success = 0;
      res.send(resData)
    }

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

exports.getFaceBookData = getFaceBookData;

function getGooglePlusData(token, varFunction) {
  var url = 'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + token;
  http.get(url, function (res) {
    var body = '';

    res.on('data', function (chunk) {
      body += chunk;
    });

    res.on('end', function () {
      var fbResponse = JSON.parse(body);
      fbResponse.id = fbResponse.kid;
      varFunction(fbResponse);
    });
  }).on('error', function (e) {
    console.log("Got an error: ", e);
  });
};

exports.getGooglePlusData = getGooglePlusData;



