/**
 * Created by MoonJR on 2015. 10. 15..
 */

var natural = require('natural');
var uuid = require('node-uuid');
var tokenizer = new natural.TreebankWordTokenizer();

//var db = require('../models/dbSaveScript');

var collection = require('../models/dbCollection');


// 테스트 json
////console.log(tokenizer.tokenize("NEW HARTFORD, N.Y. — To its neighbors in this upstate town, Word of Life Christian Church presented itself as a constant curiosity: an imposing but tidy former schoolhouse whose occupants kept to themselves, almost never opening their doors or their mouths, secluded behind a closed entrance."));
//var id = 1231415;
//var script_id = uuid.v1();
//
//var scriptJson = {
//  id: id,
//  script_id: script_id,
//  reg_date: new Date(),
//  script_content: 'WASHINGTON — Two weeks of air and missile strikes in Syria have given Western intelligence and military officials a deeper appreciation of the transformation that Russia’s military has undergone under President Vladimir V. Putin, showcasing its ability to conduct operations beyond its borders and providing a public demonstration of new weaponry, tactics and strategy.\n' +
//  'The strikes have involved aircraft never before tested in combat, including the Sukhoi Su-34 strike fighter, which NATO calls the Fullback, and a ship-based cruise missile fired more than 900 miles from the Caspian Sea, which, according to some analysts, surpasses the American equivalent in technological capability.\n' +
//  'The United States has long backed the Syrian Kurdish militia known as the People\'s Protection Units. Here, militia members in August in Syria.Turkey Expresses Concern to U.S. and Russia Over Help for Syrian KurdsOCT. 14, 2015\n' +
//  'Syrians rallied outside the Russian Embassy in Damascus on Tuesday to show support for Russian airstrikes.Mortar Shells Strike Near Russian Embassy in SyriaOCT. 13, 2015\n' +
//  'video Obama Criticizes Russian Action in SyriaOCT. 2, 2015\n' +
//  'A Russian fighter jet taking off from an air base in Syria. A number of Western countries have complained in recent years about Russian planes approaching their airspace.Russian Violations of Airspace Seen as Unwelcome Test by the WestOCT. 6, 2015\n' +
//  'Syrians in front of the Russian embassy in Damascus holding photographs of President Bashar Assad and President Vladimir V. Putin of Russia during a demonstration to thank Moscow for its intervention.Putin Says U.S. Fails to Cooperate in SyriaOCT. 13, 2015\n' +
//  'A Syrian civil defense demining unit collected unexploded cluster bombs on Thursday that activists said had been fired a day earlier by Russian aircraft in Idlib Province.Russia Denies U.S. Claim That Missiles Aimed at Syria Hit IranOCT. 8, 2015\n' +
//  'Syrian soldiers under attack Sunday in Hama Province. Government troops advanced there Monday, aided by Russian air power.U.S. Weaponry Is Turning Syria Into Proxy War With RussiaOCT. 12, 2015\n' +
//  'Russia’s jets have struck in support of Syrian ground troops advancing from areas under the control of the Syrian government, and might soon back an Iranian-led offensive that appeared to be forming in the northern province of Aleppo on Wednesday. That coordination reflects what American officials described as months of meticulous planning behind Russia’s first military campaign outside former Soviet borders since the dissolution of the Soviet Union.'
//}

exports.saveScriptExpress = function saveScriptExpress(req, res) {

  var response = {};

  try {
    var script = {
      id: req.session.user_id,
      script_id: uuid.v1(),
      script_title: req.body.title,
      script_content: req.body.content,
      reg_date: new Date()
    };

    saveScript(script);
    var paragraphJsonArray = scriptToParagraphJsonArray(script);
    saveParagraph(paragraphJsonArray);
    for (var i = 0; i < paragraphJsonArray.length; i++) {
      var morphemeJsonArray = paragraphToMorphemeJsonArray(paragraphJsonArray[i]);
      if(morphemeJsonArray.length==0){
        continue;
      }
      saveMorpheme(morphemeJsonArray);
    }
    response.success = 1;
  } catch (e) {
    console.log(e);
    response.success = 0;
  }

  res.send(response);

}

function saveScript(script) {
  collection.scriptCollection.insert(script, function (err, result) {
    if (err) {
      throw err;
    }
  });
}

function saveParagraph(paragraph) {
  collection.paragraphCollection.insert(paragraph, function (err, result) {
    if (err) {
      throw err;
    }
  });
}

function saveMorpheme(morpheme) {
  collection.morphemeCollection.insert(morpheme, function (err, result) {
    if (err) {
      throw err;
    }
  });
}


function scriptToParagraphJsonArray(script) {
  var id = script.id;
  var script_id = script.script_id;
  var paragraph_array = script.script_content.split('\n');

  var returnArray = [];
  for (var i = 0; i < paragraph_array.length; i++) {
    var paragraphJsonTmp = {
      id: id,
      script_id: script_id,
      paragraph_id: i,
      content: paragraph_array[i],
    };

    returnArray[i] = paragraphJsonTmp;
  }

  return returnArray;
}

exports.scriptToParagraphJsonArray = scriptToParagraphJsonArray;

function paragraphToMorphemeJsonArray(paragraph) {
  var id = paragraph.id;
  var script_id = paragraph.script_id;
  var paragraph_id = paragraph.paragraph_id;
  var morpheme_array = tokenizer.tokenize(paragraph.content);

  var returnArray = [];

  for (var i = 0; i < morpheme_array.length; i++) {
    var morphemeJsonTmp = {
      id: id,
      script_id: script_id,
      paragraph_id: paragraph_id,
      morpheme_id: i,
      content: morpheme_array[i],
    }

    returnArray[i] = morphemeJsonTmp;
  }

  return returnArray;
}

exports.paragraphToMorphemeJsonArray = paragraphToMorphemeJsonArray;









