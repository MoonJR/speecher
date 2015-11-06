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
    (function initController() {
      logout();
    })();

    function facebookLogin() {
      $facebook.login().then(
        _successFacebookLogin_,
        _errorHandler_('Error: facebookLogin')
      );
    }

    function googleLogin() {
      GooglePlus.login().then(
        _successGoogleLogin_,
        _errorHandler_('Error: googleLogin')
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
    function _successFacebookLogin_() {
      $facebook.getLoginStatus().then(
        function (response) {
          if (response.authResponse) {
            console.log(response);
            _loginToServer_('facebook', response.authResponse.accessToken);
          }
        },
        _errorHandler_('Error: getLoginStatus')
      );
    }

    function _successGoogleLogin_(response) {
      console.log(response);
      _loginToServer_('google', response.id_token);
    }

    function _loginToServer_(url, token) {
      return loginService.sendCredentials(url, token, function (response) {
        if (response.data.success) {
          loginService.setCredentials(url, response.data.response.email);
          $location.path('/');
        }
      });
    }

    function _errorHandler_(error) {
      console.log(error);
      return {success: false, message: error};
    }
  }
})();

