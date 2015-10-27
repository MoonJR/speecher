(function () {
  'use strict';

  angular
      .module('myApp')
      .controller('loginController', loginController);

  loginController.$inject = ['$rootScope', '$facebook', 'GooglePlus', 'loginService', '$location'];
  function loginController($rootScope, $facebook, GooglePlus, loginService, $location) {

    var vm = this;

    // APIs
    vm.facebookLogin = facebookLogin;
    vm.googleLogin = googleLogin;
    vm.logout = logout;

    // init login status
    (function initContoller() {
      logout();
    })();

    function facebookLogin() {
      $facebook.login().then(
          _successFacebookLogin,
          _errorHandler('Error: facebookLogin')
      );
    }

    function googleLogin() {
      GooglePlus.login().then(
          _successGoogleLogin,
          _errorHandler('Error: googleLogin')
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

    // private _functions
    function _successFacebookLogin() {
      $facebook.getLoginStatus().then(
          function (response) {
            if (response.authResponse) {
              console.log(response);
              _loginToServer('facebook', response.authResponse.accessToken);
            }
          },
          _errorHandler('Error: getLoginStatus')
      );
    }

    function _successGoogleLogin(response) {
      console.log(response);
      _loginToServer('google', response.id_token);
    }

    function _loginToServer(url, token) {
      return loginService.sendCredentials(url, token, function (response) {
        if (response.data.success) {
          loginService.setCredentials(url, response.data.response.email);
          $location.path('/');
        }
      });
    }

    function _errorHandler(error) {
      return {success: false, message: error};
    }
  }
})();

