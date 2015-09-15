'use strict';

angular.module('keepballin')
  .controller('TeamSignUpCtrl', ['$scope', 'Auth', function ($scope, Auth) {
  	// we will store all of our form data in this object
    $scope.formData = {};
    
    // function to process the form
    $scope.processForm = function() {
        console.log($scope.formData);
    };
  }]);//TeamSignUpCtrl ends