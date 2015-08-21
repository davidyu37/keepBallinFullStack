'use strict';

angular.module('keepballin') 
	.factory('Api', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/courts');
			},
			create : function(courtData) {
				return $http.post('/api/courts', courtData);
			},
			delete : function(id) {
				return $http.delete('/api/courts/' + id);
			}
		}
	}]);