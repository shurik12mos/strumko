'use strict';

var app = angular.module('myApp.main', ['ngRoute'])
.controller('MainCtrl', ['$scope', 'Service',  function($scope, Service) {
	var scope = $scope;	
	var service = Service.get(function(){
		scope.service = service;
		$scope.showForm = scope.service.head.showForm;
	});
	
}]);