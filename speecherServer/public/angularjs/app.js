'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'ngRoute'
]).
  config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
      $routeProvider.
        when('/view1', {
          templateUrl: 'partials/view1'
        }).
        when('/view2', {
          templateUrl: 'partials/partial2',
          controller: 'MyCtrl2'
        }).
        otherwise({
          redirectTo: 'partials/view1'
        });

  $locationProvider.html5Mode(true);
}]);
