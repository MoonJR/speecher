'use strict';

angular.module('myApp', [
  'ngRoute',
  'ngMaterial',
  'ngCookies',
  'ngFacebook',
  'angular-svg-round-progress',
  'googleplus'
])
    .config(function ($routeProvider, $locationProvider, $facebookProvider, GooglePlusProvider) {
      $routeProvider
          .when('/', {
            templateUrl: '/partials/index',
            controller: 'indexCtrl'
          })
          .when('/login', {
            templateUrl: '/partials/login',
            controller: 'loginCtrl'
          })
          .when('/write', {
            templateUrl: '/partials/write',
            controller: 'writeCtrl',
          })
          .otherwise({
            redirectTo: '/'
          });

      $facebookProvider.setAppId('1386879811618975');

      $facebookProvider.setVersion("v2.5");

      $facebookProvider.setPermissions('email');

      GooglePlusProvider.init({
        clientId: '280233748418-v4s1qjeknmb0lp6to142bblv4ab0rjcv.apps.googleusercontent.com',
        apiKey: 'AIzaSyDcLpimE6IcAL-jSDPMuWKB1i8VnxpN9Zo'
      });

      GooglePlusProvider.enableServerSide({});

      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });


    })
    .run(function ($rootScope) {
      // Load the facebook SDK asynchronously
      (function () {

        // Get the first script element, which we'll use to find the parent node
        var firstScriptElement = document.getElementsByTagName('script')[0];

        // Create a new script element and set its id
        var facebookJS = document.createElement('script');
        facebookJS.id = 'facebook-jssdk';

        // Set the new script's source to the source of the Facebook JS SDK
        facebookJS.src = '//connect.facebook.net/en_US/all.js';

        // Insert the Facebook JS SDK into the DOM
        firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);
      }());
    });
