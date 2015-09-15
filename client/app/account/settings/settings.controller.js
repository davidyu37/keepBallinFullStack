'use strict';

angular.module('keepballin')
  .controller('SettingsCtrl', ['$scope', 'Auth', function ($scope, Auth) {
    $scope.errors = {};
    $scope.settingUrl = '';
    $scope.profile = true;
    // $scope.team = false;
    // $scope.match = false;
    // $scope.goal = false;
    $scope.userNow = Auth.getCurrentUser();
    $scope.getTemplate = function(temp) {
      $scope.profile = false;
      $scope.team = false;
      $scope.match = false;
      $scope.goal = false;
    
      switch (temp) {
        case 0: $scope.profile = true;
        break;
        case 1: $scope.team = true;
        break;
        case 2: $scope.match = true;
        break;
        case 3: $scope.goal = true;
        break;
      }
    };

    $scope.showSignup = false;

    $scope.showToggle = function() {

        $scope.showSignup = !($scope.showSignup);
        console.log($scope.showSignup);    
    };
    
    $scope.stopPropagate = function(event) {
      event.stopPropagation();
    };


    
  }]);
