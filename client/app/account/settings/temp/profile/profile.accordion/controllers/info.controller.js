'use strict';

angular.module('keepballin')
  .controller('InfoCtrl', ['$scope', 'User', 'Auth', function ($scope, User, Auth) {
  	$scope.user = Auth.getCurrentUser();
    
    $scope.status = {
        opened: false
    };
    
    $scope.open = function($event) {
        $scope.status.opened = true;
    };

    
  }]);//NameCtrl ends 