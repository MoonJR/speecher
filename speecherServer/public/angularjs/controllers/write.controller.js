(function () {
  'use strict';

  angular
      .module('myApp')
      .controller('writeController', writeController);

  writeController.$inject = ['$scope', '$http', '$location'];
  function writeController($scope, $http, $location) {

    var vm = this;

    // APIs
    vm.location = $location;
    vm.response = 0;
    vm.saveScript = saveScript;

    function saveScript () {

      if($scope.title && $scope.content) {
        var data = {
          title: $scope.title,
          content: $scope.content
        };

        $http.post('/main/scriptSave', data).then(
            function (response) {
              console.log(response);
              vm.response = response.data.success;

              if(response.data.success){
                //console.log("save script");
                $location.path('/');
                return response;
              } else {
                _errorHandler_('Error: saveScript success 0');
              }
            },
            _errorHandler_('Error: saveScript')
        );
      }
    }

    $scope.readScript = function($file){
      $scope.title = $file.title;
      $scope.content = $file.content;
    };

    // private functions
    function _errorHandler_ (error) {
      console.log(error);
      return { success: false, message: error };
    }
  }
})();

