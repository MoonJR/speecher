(function () {
  'use strict';

  angular
      .module('myApp')
      .directive('ngFileRead', ngFileRead);

  ngFileRead.$inject = ['$parse'];
  function ngFileRead($parse) {

    var directive = {
      restrict: 'A',
      scope: false,
      link: link
    };

    return directive;

    function link(scope, element, attrs) {
      var fn = $parse(attrs.ngFileRead);

      element.on('change', function(onChangeEvent) {
        var file = (onChangeEvent.srcElement || onChangeEvent.target).files[0];
        var reader = new FileReader();

        reader.onload = function(onLoadEvent) {
          scope.$apply(function() {
            fn(scope, { $file: { title: file.name, content: onLoadEvent.target.result }});
          });
        };

        reader.readAsText(file);
      });
    }
  }
})();

