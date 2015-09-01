'use strict';

angular.module('keepballin')
	.controller('uploadCtrl', ['$scope', 'Upload', '$timeout', '$http', function ($scope, Upload, $timeout, $http) {
    // $scope.$watch('files', function () {
    //     $scope.upload($scope.files);
    // });
    // $scope.$watch('file', function () {
    //     if ($scope.file != null) {
    //         $scope.upload([$scope.file]);
    //     }
    // });


    $scope.$watch('currentcourt._id', function(newVal, oldVal) {
        if(newVal) {
            console.log(newVal);
            // $scope.getPicture(newVal);
        }
    });

    $scope.getPicture = function(id) {
        console.log('id is '+ id);
        $http({
            url: '/upload/' + id, 
            method: "GET",
            data: {id: id}
         }).then(function(data){
            $scope.url = data.config.url;

         });
        
    };


    $scope.log = '';

    $scope.url = '';

    $scope.submit = function(form) {
    
      if (form.file.$valid && $scope.file && !$scope.file.$error) {
        $scope.upload([$scope.file], form.court_id);
      }
      if (form.file.$valid && $scope.files && !$scope.files.$error) {
        $scope.upload($scope.files, form.court_id);
      }

    };


    $scope.upload = function (files, court_id) {
       
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
              var file = files[i];
              
              if (!file.$error) {
                
                Upload.upload({
                    url: '/upload',
                    fields: {
                        'username': $scope.username,
                        'court_id': court_id
                    },
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    $scope.log = 'progress: ' + progressPercentage + '% ' +
                                evt.config.file.name + '\n' + $scope.log;
                }).success(function (data, status, headers, config) {
                    $timeout(function() {
                        $scope.log = 'file: ' + config.file.name + ', Response: ' + JSON.stringify(data) + '\n' + $scope.log;
                    });
                });
              }
            }
        }
    };

    

}]);