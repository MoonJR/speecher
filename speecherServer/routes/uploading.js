/**
 * Created by kimminki on 2015. 11. 1..
 */

// Muaz Khan     - www.MuazKhan.com
// MIT License   - www.WebRTC-Experiment.com/licence
// Source Code   - github.com/muaz-khan/WebRTC-Experiment/tree/master/RecordRTC/RecordRTC-to-Nodejs

var fs = require('fs'),
    sys = require('sys');
var upload_dir = '/uploads'

// this function uploads files

function upload(response, file) {
    var fileRootName = file.name.split('.').shift(),
        fileExtension = file.name.split('.').pop(),
        filePathBase = upload_dir + '/',
        fileRootNameWithBase = filePathBase + fileRootName,
        filePath = fileRootNameWithBase + '.' + fileExtension,
        fileID = 2,
        fileBuffer;

    while (fs.existsSync(filePath)) {
        filePath = fileRootNameWithBase + '(' + fileID + ').' + fileExtension;
        fileID += 1;
    }

    file.contents = file.contents.split(',').pop();

    fileBuffer = new Buffer(file.contents, "base64");

    fs.writeFileSync(filePath, fileBuffer);
}

exports.upload = upload;
