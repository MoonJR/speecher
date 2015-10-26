//테스트 진행 보여주면서 하고 싶으면 활성화
//var origFn = browser.driver.controlFlow().execute;
//
//browser.driver.controlFlow().execute = function() {
//  var args = arguments;
//
//  // queue 100ms wait
//  origFn.call(browser.driver.controlFlow(), function() {
//    return protractor.promise.delayed(100);
//  });
//
//  return origFn.apply(browser.driver.controlFlow(), args);
//};

describe('indexController test', function() {

  it('단어 리스트 아이템 클릭시 다이얼로그 ', function() {

    browser.get('http://127.0.0.1:3000');

    var words = element.all(by.css('#box-words md-chips'));
    //Model 검색이 인식이 안되는데, 이후 다시 찾아보고  model.count 와 비교하고,
    //클릭시  Dialog 열리는것도 추가
    //expect(element(by.model('words')).count()).toBe(2);
    expect(words.count()).toBe(2);

  });

});
