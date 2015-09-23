'use strict';

angular.module('keepballin')
  .controller('LoginCtrl', ['$scope', 'Auth', '$location', '$window', '$modalInstance', function ($scope, Auth, $location, $window, $modalInstance) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          // $location.path('/');
          $modalInstance.close();
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

    $scope.closeModal = function() {
      $modalInstance.close();
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  }]);
