'use strict';

angular.module('keepballin')
	.controller('uploadCtrl', ['$scope', '$q', '$window', 'Upload', 'Download', '$timeout', '$http', 'Court', 'socket', 'Lightbox', function ($scope, $q, $window, Upload, Download, $timeout, $http, Court, socket, Lightbox) {
    //Slides of pictures
    $scope.slides = [];
    //If court id change, get new pictures
    $scope.$watch('currentcourt._id', function(newVal, oldVal) {
        if(newVal) {
            $scope.getPicture(newVal);
        }
    });

    //socket.io instant updates
    socket.syncUpdates('upload', $scope.slides);
    $scope.$on('$destroy', function () {
        socket.unsyncUpdates('upload');
    });

    //Using court id to collect an array of pictures
    $scope.getPicture = function(id) {
        console.log('get picture');
        var pics = Download.query({court_id: id},function(data) {
            if(!data) {
                angular.noop;
            } else {
                $scope.slides = pics;
                
            }
        });
    };
    //Lightbox
    $scope.openLightboxModal = function (index) {
        Lightbox.openModal($scope.slides, index);
    };

    //Log is the progress percentage for upload, empty the courtinfos for other previews
    $scope.log = 0;
    $scope.courtinfos = [];
    //Clear the preview pictures
    $scope.clearPreview = function() {
        $scope.courtinfos = [];
    }
    //Submit pictures
    $scope.submit = function(form) {
      if (form.courtpic.$valid && $scope.files && !$scope.files.$error) {
        $scope.upload($scope.files, form.court_id);
      }
    };

    $scope.deletePic = function(pic) {
        console.log(pic._id);
        var check = $window.confirm('確定要刪掉這張照片嗎？');
        if (check) {    
            Download.remove({ id: pic._id });
            $scope.getPicture($scope.currentcourt._id);
        } else {
            angular.noop;
        }
    };
    //Go through the files' array and upload
    $scope.upload = function (files, court_id) {        

        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
              var file = files[i];
              if (!file.$error) {
                
                Upload.upload({
                    url: 'api/uploads/pictures',
                    fields: {
                        'username': $scope.username,
                        'court_id': court_id
                    },
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    $scope.log = progressPercentage;
                    // $scope.log = 'progress: ' + progressPercentage + '% ' +
                    //             evt.config.file.name + '\n' + $scope.log;
                }).success(function (data, status, headers, config) {
                    $timeout(function() {
                        var courtinfo = {
                            url: data.url,
                            name: data.filename,
                            court_id: data.court_id,
                            pic_id: data._id
                        };
                        //Preview pics
                        $scope.courtinfos.push(courtinfo);
                        //Get the new pictures to the slides
                        
                        //Clear the files for more uploads
                        $scope.files = [];
                        //Reset the progress bar
                        $scope.log = 0;
                        // $scope.log = 'file: ' + config.file.name + ', Response: ' + JSON.stringify(data) + '\n' + $scope.log;
                        $scope.getPicture($scope.currentcourt._id)
                    });
                });
              }
            }
        }
    };

    

}]);