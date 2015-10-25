'use strict';

angular.module('myApp')
    .controller('loginCtrl', function($scope, $facebook, GooglePlus, $http, $location){

      // init login status
      (function initController() {
        $scope.logout;
      })();

      // APIs
      $scope.loginStatus = null;
      $scope.facebookLogin = facebookLogin;
      $scope.googleLogin = googleLogin;
      $scope.logout = logout;

      function facebookLogin() {
        $facebook.login().then(
            successFacebookLogin,
            errorHandler('Error: facebookLogin')
        );
      }

      function googleLogin() {
        GooglePlus.login().then(
            successGoogleLogin,
            errorHandler('Error: googleLogin')
        );
      }

      function logout() {
        if ($scope.loginStatus === 'facebook') {
          $facebook.logout();
        }
        else if ($scope.loginStatus === 'google') {
          GooglePlus.logout();
        }
        $scope.loginStatus = null;
      }

      // private functions
      function successFacebookLogin () {
        $facebook.getLoginStatus().then(
            function (response) {
              var token = response.authResponse.accessToken;
              $scope.loginStatus = 'facebook';
              sendToken(token, $scope.loginStatus);
            },
            errorHandler('Error: getLoginStatus')
        );
      }

      function successGoogleLogin (response) {
        var token = response.id_token;
        $scope.loginStatus = 'google';
        sendToken(token, $scope.loginStatus);
      }

      function sendToken (token, url) {
        $http({
          method: 'GET',
          url: '/login/' + url,
          params: {token: token}
        }).then(
            function (response) {
              $location.path('/index');
              console.log(response.data);
            },
            errorHandler('Error: sendToken')
        );
      }

      function errorHandler (error) {
        return { success: false, message: error };
      }
    });

