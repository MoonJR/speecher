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

describe('angularjs homepage todo list', function() {

  it('단어 리스트 아이템 클릭시 다이얼로그 ', function() {

    browser.get('http://127.0.0.1:3000');

    var words = element.all(by.css('#box-words md-chips'));


    // Find the element with ng-model="words"
    //console.log(element(by.model('words')).html());
    expect(element(by.model('words')).count()).toBe(2);

    //expect(wordsModel.count()).toBe(2);
    //expect(words.count()).toBe(2);


  });

});
