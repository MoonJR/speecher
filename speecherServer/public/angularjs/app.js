'use strict';
var app = angular.module('myApp', ['ngRoute','ngMaterial','angular-svg-round-progress']);

  app.config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/index', {
        templateUrl: '/partials/index',
        controller: 'indexCtrl',
      }).
      when('/write', {
        templateUrl: '/partials/write',
        //controller: 'BookController',
      }).
      otherwise({
        redirectTo: '/index'
      });

    // configure html5 to get links working on jsfiddle
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  });

app.controller('indexCtrl', function($scope) {
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
});


angular
  .module('inputBasicDemo', ['ngMaterial', 'ngMessages'])
  .controller('textareaCtrl', function($scope) {
    $scope.user = {
      title: 'Developer',
      email: 'ipsum@lorem.com',
      firstName: '',
      lastName: '',
      company: 'Google',
      address: '1600 Amphitheatre Pkwy',
      city: 'Mountain View',
      state: 'CA',
      biography: 'Loves kittens, snowboarding, and can type at 130 WPM.\n\nAnd rumor has it she bouldered up Castle Craig!',
      postalCode: '94043'
    };
    $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
    'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
    'WY').split(' ').map(function(state) {
        return {abbrev: state};
      })
  })
  .config(function($mdThemingProvider) {
    // Configure a dark theme with primary foreground yellow
    $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('yellow')
      .dark();
  });

