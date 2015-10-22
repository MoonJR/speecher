'use strict';
//var app = angular.module('myApp', ['ngRoute','ngMaterial','angular-svg-round-progress']);
var app = angular.module('myApp');

app.controller('indexCtrl', function($scope, $mdDialog) {
  $scope.texts = [{
    what: 'Brunch this weekend?',
    who: 'Min Li Chan',
    when: '3:08PM',
    notes: " I'll be in your neighborhood doing errands"
  }];

  $scope.words = [
    {
      id: 1,
      word: 'Must',
      count: 5
    }, {
      id: 2,
      word: 'Should',
      count: 4
    }
  ];




  $scope.showWordDlg = function(content) {
    $mdDialog.show(
      $mdDialog.alert()
        .clickOutsideToClose(true)
        .title("DetailWord")
        .content(content)
        .ariaLabel(content)
        .ok('Close')
    );
  };
});


