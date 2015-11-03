/**
 * Created by kimminki on 2015. 11. 4..
 */

describe('dbTest', function() {

  describe('.totalFailWord(scriptId)', function() {
    var testWord = 'area';
    var user_id = 1;
    var wordLimit = 10;
    it('모든 틀린 형태소에 대한 데이터가 받아와져야 한다.', function(done) {
      dbTest.totalFailWord(user_id, wordLimit, function(err, data){
        data.should.be.object;
        done();
      });
    });
    it('가장 많이 틀린 데이터가 영어 단어인지 확인해본다.', function(done) {
      dbTest.totalFailWord(user_id, wordLimit, function(err, data){
        data[0].content.should.equal(testWord);
        done();
      });
    });
  });

  describe('.wrongWordDetail(scriptId)', function() {
    var word = 'wind';
    it('틀린 형태소 상세 데이터 불러오기', function (done) {
      wordDetail.wordDetailData(word, function (err, data) {
        data.should.be.object;
        done();
      });
      //wɪnd
    });

    it('발음 기호 맞는지 확인', function (done) {
      wordDetail.wordDetailData(word, function (err, data) {
        'wɪnd'.should.equal(data.pronunciation.all);
        done();
      });
    });
  });
});
