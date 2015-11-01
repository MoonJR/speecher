/**
 * Created by MoonJR on 2015. 10. 24..
 */
var uploading = require('./uploading');

exports.recordSpeaking = function (req, res) {
  console.log('dddd');
    console.log(req.body);
    //var files = JSON.parse(req);
    //console.log('wow');
    //// writing audio file to disk
    //uploading.upload(response, files.audio);
    //
    //if (files.uploadOnlyAudio) {
    //    response.statusCode = 200;
    //    response.writeHead(200, {'Content-Type': 'application/json'});
    //    response.end(files.audio.name);
    //}
};
