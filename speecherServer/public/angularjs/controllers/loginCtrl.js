'use strict';

angular.module('myApp')
    .controller('loginCtrl', function($scope, $facebook, GooglePlus, loginService, $location){

      // init login status

      // APIs
      $scope.loginStatus = null;
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
        if ($scope.loginStatus === 'facebook') {
          $facebook.logout();
        }
        else if ($scope.loginStatus === 'google') {
          GooglePlus.logout();
        }
        $scope.loginStatus = null;
        loginService.clearCredentials();
      }

      // private functions
      function successFacebookLogin () {
        $facebook.getLoginStatus().then(
            function (response) {
              if(response.authResponse) {
                console.log(response);
                var token = response.authResponse.accessToken;
                $scope.loginStatus = 'facebook';
                loginToServer($scope.loginStatus, token)
              }
            },
            errorHandler('Error: getLoginStatus')
        );
      }

      function successGoogleLogin (response) {
        console.log(response);
        var token = response.id_token;
        $scope.loginStatus = 'google';
        sendToken(token, $scope.loginStatus);
      }

      function loginToServer(url, token) {
        return loginService.sendCredentials(url, token, function(response) {
          if(response.data.success) {
            loginService.setCredentials(response.data.response.email);
          }
        });
      }


      //function sendToken (token, url) {
      //  $http({
      //    method: 'GET',
      //    url: '/login/' + url,
      //    params: {token: token}
      //  }).then(
      //      function (response) {
      //        console.log(response);
      //        if(response.status === 200) {
      //          loginService.setCredentials(response.data.email);
      //          $location.path('/');
      //          console.log(response.data);
      //        }
      //      },
      //      errorHandler('Error: sendToken')
      //  );
      //}

      function errorHandler (error) {
        return { success: false, message: error };
      }
    });

