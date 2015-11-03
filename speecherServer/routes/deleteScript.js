/**
 * Created by MoonJR on 2015. 11. 4..
 */

var error = require('./error');
var tokenizer = new natural.TreebankWordTokenizer();

var collection = require('../models/dbCollection');


exports.deleteScriptExpress = function deleteScriptExpress(req, res) {

  try {
    var query = {script_id: req.body.script_id};

    try {
      deleteScript(query);
    } catch (e) {
      console.log(e);
      res.send(error.db_save_error);
    }
    try {
      deleteParagraph(query);
    } catch (e) {
      console.log(e);
      res.send(error.db_save_error);
    }
    try {
      deleteMorpheme(query);
    } catch (e) {
      console.log(e);
      res.send(error.db_save_error);
    }

    res.send(error.success);

  } catch (e) {
    console.log(e);
    res.send(error.unknown_error);

  }


}

function deleteScript(query) {

  collection.scriptCollection.remove(query, function (err, result) {
    if (err) {
      throw err;
    }
  });

}

function deleteParagraph(query) {
  collection.paragraphCollection.remove(query, function (err, result) {
    if (err) {
      throw err;
    }
  });
}

function deleteMorpheme(query) {
  collection.morphemeCollection.remove(query, function (err, result) {
    if (err) {
      throw err;
    }
  });
}
