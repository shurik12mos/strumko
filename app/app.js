'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngRoute',
  'myApp.service',
  'myApp.main',
  'ngResource'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/service/', {
      templateUrl: 'app/service/service.html',
      controller: 'ServiceCtrl'
  }) 
  .when('/main/', {
	 templateUrl: 'app/main/main.html',
     controller: 'MainCtrl'
  }) 
  .otherwise({redirectTo: '/main/'});
}])
app.controller('AppCtrl', ['$scope', '$location', function($scope, $location){
	$scope.clas = function(url) {		
		var reg = new RegExp('/', 'g');	
		var path = $location.path().replace(reg, "");
		if (path==url) {			
			return true;
		} else {
			return false;
		}		
	}
	
	var reg = new RegExp('/', 'g');	
	$scope.main = $location.path().replace(reg, "")=="main";
	$scope.service = $location.path().replace(reg, "")=="service";		
}]);

app.factory('Service', function($resource) {
	var Service = $resource('api/service.json',	
			{},
			{
				update: {
						method: "PUT"
						}
			}
		); 
		return Service;
	});


