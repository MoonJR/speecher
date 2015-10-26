describe('writeCtrl Test', function() {

  it('writing script title, text. ', function() {
    browser.get('http://127.0.0.1:3000/write');
    var words = element.all(by.css('#box-words md-chips'));


    element(by.id('title')).sendKeys("test title.");
    element(by.id('text')).sendKeys("test text test text test text test text");

    element(by.id('save')).click();

    // 서버에  AJAX 통신으로 보냄. 까지 체크
  });

  it('import script title, text. ', function() {
    // 파일 임포트까지 테스트는 어려울 것 같고,  text 파일을 가져와서 그냥 넣어주면 되려나
  });
});
