'use strict';

angular.module('keepballin')
  .controller('MyCourtCtrl', ['$scope', 'Auth', function ($scope, Auth) {
  	$scope.map = { 
  		center: { latitude: 45, longitude: -73 }, 
  		zoom: 8 
  	};
  }]);