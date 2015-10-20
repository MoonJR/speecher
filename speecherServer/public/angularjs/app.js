'use strict';

// Declare app level module which depends on filters, and services
//
//angular.module('myApp',['ngRoute']).
//  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
//    $routeProvider.
//      when('/view1', {
//        templateUrl: '/partials/view1.html'
//      }).
//      when('/view2', {
//        templateUrl: '/partials/view2.jade'
//      }).
//      otherwise({
//        redirectTo: '/'
//      });
//    $locationProvider.html5Mode(true);
//  }]);
//


angular.module('myApp', ['ngRoute'])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/view1', {
        templateUrl: '/partials/view1',
        //controller: 'BookController',
        resolve: {
          // I will cause a 1 second delay
          delay: function($q, $timeout) {
            var delay = $q.defer();
            $timeout(delay.resolve, 1000);
            return delay.promise;
          }
        }
      }).
      when('/view2', {
        templateUrl: '/partials/view2',
        //controller: 'BookController',
        resolve: {
          // I will cause a 1 second delay
          delay: function($q, $timeout) {
            var delay = $q.defer();
            $timeout(delay.resolve, 1000);
            return delay.promise;
          }
        }
      }).
      otherwise({
        redirectTo: '/'
      });

    // configure html5 to get links working on jsfiddle
    $locationProvider.html5Mode(true);
  });
