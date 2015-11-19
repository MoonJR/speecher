/**
 * Created by MoonJR on 2015. 10. 10..
 */


var db = require('../models/dbSnsLogin');
var error = require('./error');


var http = require('https');
exports.facebookLogin = function (req, res) {

  try {
    var facebookToken = req.query.token;

    if (typeof facebookToken == 'undefined') {
      res.send(error.short_parameter);
      return;
    }

    getFaceBookData(facebookToken, function (response) {
      response.route = 'facebook';

      var resData = {};
      response._id = response.id;
      resData.response = response;
      if (typeof response.id != 'undefined') {
        db.login(response, function (err, result) {
          resData.success = error.successCode.success;
          resData.msg = error.successMsg.success;
          req.session.user_id = response.id;
          res.send(resData);
        });
      } else {
        res.send(error.external_error);
      }

    });
  } catch (e) {
    console.log(e);
    res.send(error.unknown_error);
  }


};

exports.googleLogin = function (req, res) {
  try {
    var googleToken = req.query.token;

    if (typeof googleToken == 'undefined') {
      res.send(error.short_parameter);
      return;
    }

    getGooglePlusData(googleToken, function (response) {

      var responseParse = {
        _id: response.sub,
        route: 'google',
        id: response.sub,
        email: response.email,
        name: response.email
      };

      var resData = {};
      resData.response = responseParse;

      if (typeof responseParse.id != 'undefined') {
        db.login(responseParse, function (err, result) {
          resData.success = error.successCode.success;
          resData.msg = error.successMsg.success;
          req.session.user_id = responseParse.id;
          res.send(resData);
        });
      } else {
        res.send(error.external_error);
      }
    });
  } catch (e) {
    console.log(e);
    res.send(error.unknown_error);
  }

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
