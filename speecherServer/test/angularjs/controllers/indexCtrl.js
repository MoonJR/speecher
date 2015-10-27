'use strict';

//stub
var texts = [{
  id: '1',
  title: 'Brunch this weekend?',
  point: '84',
  type: 'Blind Test',
  text: " I'll be in your neighborhood doing errands"
},{
  id: '2',
  title: 'Brunch this weekend?',
  point: '70',
  type: 'Blind Test',
  text: " I'll be in your neighborhood doing errands"
}];

var words = [
  {
    id: '1',
    word: 'Must',
    count: '5'
  }, {
    id: '2',
    word: 'Should',
    count: '4'
  }
];

describe('indexCtrl', function() {
  beforeEach(module('myApp'));
  var $controller;
  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));

  describe('$scope.showWordDlg', function() {
    it('if click word, showing that word`s detail data in dialog', function() {
      var $scope = {};
      var controller = $controller('indexCtrl', { $scope: $scope });
      //stub
      //$scope.words = words;
      expect($scope.words[0]).not.toBe(null);
      expect($scope.words[0].id).not.toBe(null);

    });
  });

  //it('Set profile name and image (sojin after login made)', function () {
  //  expect("1").toBe("1");
  //});
  //
  //it('Load Words, and can showing detail word dialog ', function () {
  //  expect("1").toBe("1");
  //});
  //
  //it('Load Scripts', function () {
  //  expect("1").toBe("1");
  //});
});

