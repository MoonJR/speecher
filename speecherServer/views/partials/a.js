/**
 * Created by jaisonoh on 2015. 10. 25..
 */
$scope.googleLogin = function () {
  GooglePlus.login().then(function (authResult) {

    $scope.oauthStatus.isLoggedIn = true;
    $scope.oauthStatus.google = true;

    console.log(authResult);

    googleLoginStatus();
    sendGoogleAccessToken(authResult.id_token);

  }, function (err) {
    console.log(err);
  });
};

/**
 * Low Level Functions
 */


var googleLoginStatus = function () {
  GooglePlus.getUser().then(function (user) {
    console.log(user);
  }, function (err) {
    console.log(err);
  });
};

var sendGoogleAccessToken  = function (accessToken) {
  $http({
    method: 'GET',
    url: '/login/google',
    params: {token: accessToken}
  }).then(function (response) {
    $location.path('/index');
    console.log(response.data);
  }, function (err) {
    console.log(err);
  });
};
