'use strict';

var app = angular.module('myApp.service', ['ngRoute'])
.controller('ServiceCtrl', ['$scope', 'Service', function($scope, Service) {
	var scope = $scope;	
	var service = Service.get(function(){
		scope.service = service;
		$scope.showForm = scope.service.head.showForm;
	});	
}]);