'use strict';

angular.module('keepballin')
	.controller('uploadCtrl', ['$scope', '$q', 'Upload', '$timeout', '$http', 'Court', function ($scope, $q, Upload, $timeout, $http, Court) {
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
            $scope.getPicture(newVal);
        }
    });

    $scope.getPicture = function(id) {
        $http({
            url: '/upload/' + id, 
            method: "GET",
            data: {id: id}
         }).then(function(data){
            console.log(data);
            $scope.url = data.config.url;

         });
        
    };


    $scope.log = '';

    $scope.url = '';

    $scope.submit = function(form) {
        //Store the court id now
        var courtId = $scope.currentcourt._id;
        //Get data for current court to modify
        var courtNow = Court.get({id : courtId});

      if (form.file.$valid && $scope.files && !$scope.files.$error) {
        $scope.upload($scope.files, form.court_id);
      }

    };


    $scope.upload = function (files, court_id) {
        

        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
              var file = files[i];
              console.log(file);
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
                        // $scope.log = 'file: ' + config.file.name + ', Response: ' + JSON.stringify(data) + '\n' + $scope.log;
                        
                    });
                });
              }
            }
        }
    };

    

}]);