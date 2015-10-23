angular.module('myApp')
  .controller('loginCtrl', function($scope, $facebook, $http){
    $scope.isLoggedIn = false;

    $scope.logout = function () {
      $facebook.logout().then(function() {
        $scope.isLoggedIn = false;
      });
    }

    $scope.login = function() {
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

          $http({
            method: 'GET',
            url: '/login/facebook',
            params: {token: response.authResponse.accessToken}
          }).then(function successCallback(response) {
            console.log(response.data);
          }, function errorCallback(response) {

          });

        },
        function(err) {

        }
      );

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

