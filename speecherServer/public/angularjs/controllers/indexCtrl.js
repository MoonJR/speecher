'use strict';
//var app = angular.module('myApp', ['ngRoute','ngMaterial','angular-svg-round-progress']);
var app = angular.module('myApp');

app.controller('indexCtrl', function($scope, $mdDialog) {
  $scope.texts = [{
    id: 1,
    title: 'Brunch this weekend?',
    point: 84,
    type: 'Blind Test',
    text: " I'll be in your neighborhood doing errands"
  },{
    id: 2,
    title: 'Brunch this weekend?',
    point: 70,
    type: 'Blind Test',
    text: " I'll be in your neighborhood doing errands"
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


