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
        $scope.slides = [];
        var pics = Download.query({court: id},function(data) {
            if(!data) {
                return;
            } else {
                console.log(data);
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
    //Clear the preview pictures
    $scope.clearPreview = function() {
        console.log('cleared');
        $scope.files = null;
    };
    //Submit pictures
    $scope.submit = function(form) {
      if (form.courtpic.$valid && $scope.files && !$scope.files.$error) {
        $scope.upload($scope.files, form.courtId);
      } else {
        $window.alert('請加檔案');
      }
    };
    $scope.deletePic = function(pic) {
        var check = $window.confirm('確定要刪掉這張照片嗎？');
        if (check) {   
            Download.delete({ id: pic._id });
            $scope.getPicture($scope.currentcourt._id);
        } else {
           return;
        }
    };
    //Go through the files' array and upload
    $scope.upload = function (files, courtId) {        

        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
              var file = files[i];
              if (!file.$error) {
                upload(file, courtId);     
                }
            }
        }
    };

    $scope.uploadCount = 0;

    function upload(file, courtId) {
        Upload.upload({
            url: 'api/uploads/pictures',
            fields: {
                'courtId': courtId
            },
            file: file
        }).progress(function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            $scope.log = progressPercentage;
        }).success(function (data) {
            //Clear the files for more uploads
            $scope.uploadCount += $scope.files.length;
            $scope.files = [];
            //Reset the progress bar
            $scope.log = 0;
        });
    }

    /* For profile picture stuff */
    //Profile pic
    $scope.newpic = '';
    //Loading
    $scope.loading = false;

    $scope.profilenow = Auth.getCurrentUser().avatar;
    
    //Upload for profile picture
    $scope.uploadprofile = function(file) {
        
      if (file && !file.$error) {
        
        Upload.upload({
            url: 'api/uploads/pictures/profile',
            // fields: {
            //     'username': $scope.username
            // },
            file: file
        }).progress(function () {
            $scope.loading = true;
        }).success(function (data) {
            $timeout(function() {
                console.log(data);
                $scope.profilenow = data.url;

                Auth.changeAvatar(data.url)
                .then( function() {
                  $scope.loading = false;
                });
            });
        });
      }      
    };

}]);