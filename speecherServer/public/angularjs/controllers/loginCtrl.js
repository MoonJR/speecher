'use strict';

angular.module('myApp')
  .controller('loginCtrl', function($scope, $facebook, $http){
    $scope.isLoggedIn = false;

    $scope.logout = function () {
      $facebook.logout().then(function() {
        $scope.isLoggedIn = false;
      });
    }

    $scope.login = function() {
      //$facebook.loing -> module. Not yours.
      //$facebook.login, logout -> Always working and return value;
      $facebook.login().then(function() {
        refresh();
      });
    };

    function refresh() {
      $facebook.getLoginStatus().then(

        /**
         * @param {{authResponse.accessToken:string}} data
         */
        function(response) {
          console.log(response.authResponse.accessToken);
          /*
          $http({
            method: 'GET',
            url: '/login/facebook',
            params: {token: response.authResponse.accessToken}
          }).then(function successCallback(response) {
            console.log(response.data);
          }, function errorCallback(response) {

          });
          */

          connectToFacebook(refresh());

        },
        function(err) {

        }
      );

      function connectToFacebook (fSsuccessCallback) {
        $http({
          method: 'GET',
          url: '/login/facebook',
          params: {token: response.authResponse.accessToken}
        }).then(function successCallback(response) {
          console.log(response.data);
        }, function errorCallback(response) {

        });
      };

      function isLoggedIn () {

        return $scope.isLoggedIn;
      };


      $facebook.api("/me").then(
        function(response) {
          $scope.isLoggedIn = true;
          console.log(response);
        },
        function(err) {
        }
      );
    }

    refresh();
  });

