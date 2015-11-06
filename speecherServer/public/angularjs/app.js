'use strict';

angular.module('myApp', [
  'ngRoute',
  'ngMaterial',
  'ngCookies',
  'ngFacebook',
  'angular-svg-round-progress',
  'googleplus',
  'ngWebSpeech',
  'diff'
])
    .config(function ($routeProvider, $locationProvider, $facebookProvider, GooglePlusProvider) {
      $routeProvider

          .when('/', {
            templateUrl: '/partials/index',
            controller: 'indexController',
            controllerAs: 'vm'
          })
          .when('/login', {
            templateUrl: '/partials/login',
            controller: 'loginController',
            controllerAs: 'vm'
          })
          .when('/write', {
            templateUrl: '/partials/write',
            controller: 'writeController',
            controllerAs: 'vm'
          })
          .when('/detail/:scriptId', {
            templateUrl: '/partials/detail',
            controller: 'detailController',
            controllerAs: 'vm'
          })
          .when('/choice', {
            templateUrl: function(params){
              return '/partials/choice/';
            },
            controller: 'choiceCtrl',
            controllerAs: 'vm'
          })
          .when('/test', {
            templateUrl: function(params){
              return '/partials/test';
            },
            controller: 'testCtrl',
            controllerAs: 'vm'
          })
          .when('/result', {
            templateUrl: function(params){
              return '/partials/result';
            },
            controller: 'resultCtrl',
            controllerAs: 'vm'
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

      ///xx/xx  처리시 새로고침하면#choice/scriptId 를 인식하지 못해서 임시로 꺼둠
      //$locationProvider.html5Mode({
      //  enabled: true,
      //  requireBase: false
      //});
    })

    .run(function ($rootScope, $location, $cookieStore, $http) {
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

      // keep user logged in after page refresh

      $rootScope.globals = $cookieStore.get('globals') || {};
      if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
      }

      $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in and trying to access a restricted page
        //var restrictedPage = $.inArray($location.path(), ['/login']) === -1;

        var loggedIn = $rootScope.globals.currentUser;
        if (!loggedIn) {
          $location.path('/login');
        }
      });

    });
