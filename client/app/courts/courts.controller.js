'use strict';

angular.module('keepballin')
	.controller('CourtsCtrl', ['$scope', '$http', 'socket', function ($scope, $http, socket) {
		// $scope.allCourts = [];

	 //    $http.get('/api/courts').success(function(allCourts) {
	 //      $scope.allCourts = allCourts;
	 //      socket.syncUpdates('court', $scope.allCourts);
	 //      console.log(allCourts);
	 //    });

	 //    $scope.addCourt = function() {
	 //      if($scope.newCourt === '') {
	 //        return;
	 //      }
	 //      $http.post('/api/courts', { name: $scope.newCourt });
	 //      $scope.newcourt = '';
	 //    };

	 //    $scope.deleteCourt = function(court) {
	 //      $http.delete('/api/courts/' + court._id);
	 //    };

	 //    $scope.$on('$destroy', function () {
	 //      socket.unsyncUpdates('court');
	 //    });
	}]);//mapCtrl ends here