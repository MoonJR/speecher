'use strict';
var app = angular.module('myApp', ['ngRoute','ngMaterial','angular-svg-round-progress']);

  app.config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/index', {
        templateUrl: '/partials/index',
        controller: 'indexCtrl'
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
