/**
 * Created by MoonJR on 2015. 10. 16..
 */
var stemmers = require('../routes/stemmers');
var uuid = require('node-uuid');


describe('Stemmers', function () {
  describe('#script tokenizer Test()', function () {
    var scriptJson = {
      id: uuid.v4(),
      script_id: uuid.v4(),
      reg_date: new Date(),
      script_content: 'WASHINGTON — Two weeks of air and missile strikes in Syria have given Western intelligence and military officials a deeper appreciation of the transformation that Russia’s military has undergone under President Vladimir V. Putin, showcasing its ability to conduct operations beyond its borders and providing a public demonstration of new weaponry, tactics and strategy.\n' +
      'The strikes have involved aircraft never before tested in combat, including the Sukhoi Su-34 strike fighter, which NATO calls the Fullback, and a ship-based cruise missile fired more than 900 miles from the Caspian Sea, which, according to some analysts, surpasses the American equivalent in technological capability.\n' +
      'The United States has long backed the Syrian Kurdish militia known as the People\'s Protection Units. Here, militia members in August in Syria.Turkey Expresses Concern to U.S. and Russia Over Help for Syrian KurdsOCT. 14, 2015\n' +
      'Syrians rallied outside the Russian Embassy in Damascus on Tuesday to show support for Russian airstrikes.Mortar Shells Strike Near Russian Embassy in SyriaOCT. 13, 2015\n' +
      'video Obama Criticizes Russian Action in SyriaOCT. 2, 2015\n' +
      'A Russian fighter jet taking off from an air base in Syria. A number of Western countries have complained in recent years about Russian planes approaching their airspace.Russian Violations of Airspace Seen as Unwelcome Test by the WestOCT. 6, 2015\n' +
      'Syrians in front of the Russian embassy in Damascus holding photographs of President Bashar Assad and President Vladimir V. Putin of Russia during a demonstration to thank Moscow for its intervention.Putin Says U.S. Fails to Cooperate in SyriaOCT. 13, 2015\n' +
      'A Syrian civil defense demining unit collected unexploded cluster bombs on Thursday that activists said had been fired a day earlier by Russian aircraft in Idlib Province.Russia Denies U.S. Claim That Missiles Aimed at Syria Hit IranOCT. 8, 2015\n' +
      'Syrian soldiers under attack Sunday in Hama Province. Government troops advanced there Monday, aided by Russian air power.U.S. Weaponry Is Turning Syria Into Proxy War With RussiaOCT. 12, 2015\n' +
      'Russia’s jets have struck in support of Syrian ground troops advancing from areas under the control of the Syrian government, and might soon back an Iranian-led offensive that appeared to be forming in the northern province of Aleppo on Wednesday. That coordination reflects what American officials described as months of meticulous planning behind Russia’s first military campaign outside former Soviet borders since the dissolution of the Soviet Union.'
    };


    it('대본 문단별 토큰라이징 테스트', function (done) {
      var paragraphArray = stemmers.scriptToParagraphJsonArray(scriptJson);

      if (paragraphArray != null || typeof paragraphArray != 'undefined') {

        for (var i = 0; i < paragraphArray.length; i++) {
          if (typeof paragraphArray[i].id == 'undefined') {
            throw i + '번째 인덱스 id 없음';
          } else if (typeof paragraphArray[i].script_id == 'undefined') {
            throw i + '번째 인덱스 script_id 없음';
          } else if (typeof paragraphArray[i].paragraph_id == 'undefined') {
            throw i + '번째 인덱스 paragraph_id 없음';
          } else if (typeof paragraphArray[i].content == 'undefined') {
            throw i + '번째 인덱스 content 없음';
          } else if (typeof paragraphArray[i].reg_date == 'undefined') {
            throw i + '번째 인덱스 reg_date 없음';
          }
        }
        done();
      } else {
        console.error('토큰 라이징 실패');
      }

    });

    it('문단별 형태소 토큰라이징 테스트', function (done) {
      try {
        var paragraphArray = stemmers.scriptToParagraphJsonArray(scriptJson);
        var morphemeArray = stemmers.paragraphToMorphemeJsonArray(paragraphArray[0]);

        if (morphemeArray != null || typeof morphemeArray != 'undefined') {

          for (var i = 0; i < morphemeArray.length; i++) {
            if (typeof morphemeArray[i].id == 'undefined') {
              throw i + '번째 인덱스 id 없음';
            } else if (typeof morphemeArray[i].script_id == 'undefined') {
              throw i + '번째 인덱스 script_id 없음';
            } else if (typeof morphemeArray[i].paragraph_id == 'undefined') {
              throw i + '번째 인덱스 paragraph_id 없음';
            } else if (typeof morphemeArray[i].morpheme_id == 'undefined') {
              throw i + '번째 인덱스 morpheme_id 없음';
            } else if (typeof morphemeArray[i].content == 'undefined') {
              throw i + '번째 인덱스 content 없음';
            } else if (typeof morphemeArray[i].reg_date == 'undefined') {
              throw i + '번째 인덱스 reg_date 없음';
            }
          }
          done();
        } else {
          throw '토큰 라이징 실패';
        }
      } catch (e) {
        console.log(e);
      }


    });


  });


});


