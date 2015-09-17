'use strict';

angular.module('keepballin')
  .controller('TeamCtrl', ['$scope','$timeout' ,'Auth', 'User', 'Team', 'Upload', function ($scope, $timeout, Auth, User, Team, Upload) {
  	$scope.hasTeam = false;
  	$scope.team = [];
  	if(Auth.hasTeam()) {
  		$scope.hasTeam = true;
  		var teamId = Auth.hasTeam();
  		var team = Team.get({id: teamId});
  		team.$promise.then(function(data) {
  			console.log(data);
  			$scope.team = data;
  		});
  	}

  }]);