'use strict';

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
