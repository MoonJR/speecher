'use strict';

var app = angular.module('StarterApp', ['ngMaterial']);
  app.controller('HeaderCtrl',   function($scope){
    $scope.type = "header";
  });


  app.controller('WordCtrl', function($scope) {
    $scope.words = [
      {
        id: 1,
        word: 'Must',
        count: 5
      }, {
        id: 2,
        word: 'Should',
        count: 4
      }, {
        id: 3,
        word: 'Could',
        count: 4
      }, {
        id: 4,
        word: 'Like',
        count: 4
      }, {
        id: 5,
        word: 'School',
        count: 3
      }, {
        id: 6,
        word: 'Company',
        count: 2
      }
    ];
  });


  app.controller('TextlistCtrl', function($scope) {
    var imagePath = 'img/list/60.jpeg';
    $scope.texts = [{
      face : imagePath,
      what: 'Brunch this weekend?',
      who: 'Min Li Chan',
      when: '3:08PM',
      notes: " I'll be in your neighborhood doing errands"
    }, {
      face : imagePath,
      what: 'Brunch this weekend?',
      who: 'Min Li Chan',
      when: '3:08PM',
      notes: " I'll be in your neighborhood doing errands"
    }, {
      face : imagePath,
      what: 'Brunch this weekend?',
      who: 'Min Li Chan',
      when: '3:08PM',
      notes: " I'll be in your neighborhood doing errands"
    }, {
      face : imagePath,
      what: 'Brunch this weekend?',
      who: 'Min Li Chan',
      when: '3:08PM',
      notes: " I'll be in your neighborhood doing errands"
    }, {
      face : imagePath,
      what: 'Brunch this weekend?',
      who: 'Min Li Chan',
      when: '3:08PM',
      notes: " I'll be in your neighborhood doing errands"
    }];



    //
    //$scope.words = [{
    //  word: 'must',
    //  count: '7',
    //  id: 3,
    //}, {
    //  word: 'should',
    //  count: '4',
    //  id: 4,
    //}, {
    //  word: 'nothing',
    //  count: '2',
    //  id: 4,
    //}];

  });


