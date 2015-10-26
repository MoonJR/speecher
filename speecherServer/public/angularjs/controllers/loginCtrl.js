'use strict';

angular.module('myApp')
    .controller('loginCtrl', function($rootScope, $scope, $facebook, GooglePlus, loginService, $location){

      // init login status

      // APIs
      $scope.facebookLogin = facebookLogin;
      $scope.googleLogin = googleLogin;
      $scope.logout = logout;

      logout();

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
        var loggedIn = $rootScope.globals.currentUser;

        if (loggedIn) {
          loginService.clearCredentials();

          if (loggedIn.oauthType === 'facebook') {
            //$facebook.logout();
          }
          else if (loggedIn.oauthType === 'google') {
            //GooglePlus.logout();
          }
        }
      }

      // private functions
      function successFacebookLogin () {
        $facebook.getLoginStatus().then(
            function (response) {
              if(response.authResponse) {
                console.log(response);
                loginToServer('facebook', response.authResponse.accessToken);
              }
            },
            errorHandler('Error: getLoginStatus')
        );
      }

      function successGoogleLogin (response) {
        console.log(response);
        loginToServer('google', response.id_token);
      }

      function loginToServer(url, token) {
        return loginService.sendCredentials(url, token, function(response) {
          if(response.data.success) {
            loginService.setCredentials(url, response.data.response.email);
            $location.path('/');
          }
        });
      }

      function errorHandler (error) {
        return { success: false, message: error };
      }
    });

