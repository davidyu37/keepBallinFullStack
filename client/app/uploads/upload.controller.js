'use strict';

angular.module('keepballin')
	.controller('uploadCtrl', ['$scope', '$window', 'Upload', 'Download', '$timeout', 'Court', 'socket', 'Lightbox', 'Auth', function ($scope, $window, Upload, Download, $timeout, Court, socket, Lightbox, Auth) {
    //Slides of pictures
    $scope.slides = [];
    //Get picture when court id change
    $scope.$on('courtIdChanged', function(e, args) {
        $scope.getPicture(args.newId);
    });
    //socket.io instant updates
    socket.syncUpdates('upload', $scope.slides);
    $scope.$on('$destroy', function () {
        socket.unsyncUpdates('upload');
    });
    //Using court id to collect an array of pictures
    $scope.getPicture = function(id) {
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
      } else {
        $window.alert('請加檔案');
      }
    };
    $scope.deletePic = function(pic) {
        var check = $window.confirm('確定要刪掉這張照片嗎？');
        if (check) {   
            Download.delete({ id: pic._id, filename: pic.filename });
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
    /* For profile picture stuff */
    //Profile pic
    $scope.newpic = '';
    //Default profile avatar
    $scope.profilenow = 'assets/images/profile/profile.jpg';
    //Upload for profile picture
    $scope.uploadprofile = function(file) {
      if (file && !file.$error) {
        
        Upload.upload({
            url: 'api/uploads/pictures/profile',
            // fields: {
            //     'username': $scope.username
            // },
            file: file
        }).progress(function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            
        }).success(function (data, status, headers, config) {
            $timeout(function() {
                console.log(data);
                $scope.profilenow = data.url;
            });
        });
      }      
    };


    

}]);