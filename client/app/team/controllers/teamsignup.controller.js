'use strict';

angular.module('keepballin')
  .controller('TeamSignUpCtrl', ['$scope', '$filter', 'Auth', 'User', 'Team', function ($scope, $filter, Auth, User, Team) {
  	// we will store all of our form data in this object
    $scope.formData = {};
    $scope.availablePeople = User.searchParams();
    console.log($scope.availablePeople);

    $scope.refreshNames = function(name) {
    	// $filter(name)($scope.availablePeople);
    	// return $scope.availablePeople = filtered;
    	// console.log(name);
    	// $scope.availablePeople = $filter(name)($scope.availablePeople);
    	// return $scope.availablePeople = User.getByName({name: name});
		// var params = {address: address, sensor: false};
		// return $http.get(
		//   'http://maps.googleapis.com/maps/api/geocode/json',
		//   {params: params}
		// ).then(function(response) {
		//   $scope.names = response.data.results
		// });
	};

    // function to process the form
    $scope.processForm = function() {
        console.log($scope.formData);
        Team.save($scope.formData);
    };
  }]);//TeamSignUpCtrl ends