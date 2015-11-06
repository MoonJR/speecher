(function () {
  'use strict';

  angular
      .module('myApp')
      .controller('indexController', indexController);

  indexController.$inject = ['$mdDialog', 'scriptService'];
  function indexController($mdDialog, scriptService) {

    var vm = this;

    // APIs
    vm.scriptList = null;
    vm.wordAll = null;
    vm.showScriptList = showScriptList;
    vm.showWrongWordAll = showWrongWordAll;
    vm.showWrongWordDialog = showWrongWordDialog;

    vm.wordsDummy = [
      {
        id: '1',
        word: 'Must',
        count: '5'
      }, {
        id: '2',
        word: 'Should',
        count: '4'
      }
    ];

    // init script list & words
    (function initController() {
      showScriptList();
      //showWrongWordAll();
    })();

    function showScriptList() {
      scriptService.getScriptList().then(
          function (response) {
            if (response.data.success) {
              if (response.data.result.length > 0) {
                vm.scriptList = response.data.result;
                scriptService.scriptList = vm.scriptList;
                //console.log(response.data.result);
              }
              console.log(response);
            }
            else {
              _errorHandler_('Error: success 0');
            }
          },
          _errorHandler_('Error: showScriptList')
      );
    }

    function showWrongWordAll() {
      scriptService.getWrongWordAll().then(
          function (response) {
            if(response.data.success) {
              vm.wordAll = response.data.result;
              //console.log(response.data.result);
            }
            else {
              _errorHandler_('Error: success 0');
            }
          },
          _errorHandler_('Error: showWrongWordAll')
      );
    }

    function showWrongWordDialog(content) {
      $mdDialog.show(
          $mdDialog.alert()
              .clickOutsideToClose(true)
              .title("DetailWord")
              .content(content)
              .ariaLabel(content)
              .ok('Close')
      );
    }

    // private functions
    function _errorHandler_(error) {
      return { success: false, message: error };
    }
  }
})();