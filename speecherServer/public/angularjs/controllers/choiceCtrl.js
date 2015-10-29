'use strict';
//var app = angular.module('myApp', ['ngRoute','ngMaterial','angular-svg-round-progress']);


angular
  .module('myApp')
  .controller('choiceCtrl', choiceController);

choiceController.$inject = ['$rootScope', 'choiceService', '$location'];

function choiceController($rootScope, choiceService, $location) {
  $rootScope.test = choiceService;
};
