'use strict';

angular.module('keepballin')
	.controller('ratingCtrl', ['$scope', 'Rating', function ($scope, Rating) {
		$scope.rate = 4;
		$scope.max = 5;
		$scope.isReadonly = false;

		$scope.hoveringOver = function(value) {
			$scope.overStar = value;
		};
		

		$scope.sendRate = function(rate) {
			var rating = {
				rate: rate,
				court: $scope.$parent.currentcourt._id
			};
			Rating.save(rating, function(data) {
				console.log(data);
			});
		};
	}]);