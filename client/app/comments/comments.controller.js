'use strict';
 
angular.module('keepballin')
  .controller('CommentCtrl', ['$scope', '$http', 'socket','Comment', 'Auth', function ($scope, $http, socket, Comment, Auth) {
    $scope.newComment = '';
 
    $scope.avatar = Auth.getCurrentUser().avatar;

    $scope.profile = 'app/profile/profile.html';

    $scope.getComments = function(courtId) {

      Comment.query({courtId: courtId},function(comments) {
          if(!comments) {
              angular.noop;
          } else {
              console.log(comments);

              $scope.comments = comments;
              socket.syncUpdates('comment', $scope.comments, function(event, comment, comments) {
                // This callback is fired after the comments array is updated by the socket listeners
         
                // sort the array every time its modified
                comments.sort(function(a, b) {
                  a = new Date(a.date);
                  b = new Date(b.date);
                  return a>b ? -1 : a<b ? 1 : 0;
                });//comments sort ends
              });//syncUpdates ends
          }//Else ends
      });
    };

    $scope.$on('courtIdChanged', function(e, args) {
       $scope.getComments(args.newId);
    });

 
    // Clean up listeners when the controller is destroyed
    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('comment');
    });
 
    // Add comments only if there's a current court
    $scope.addComment = function() {
      if(!$scope.currentcourt) {
        angular.noop;
      } else {
        var data = {
          courtId: $scope.currentcourt._id,
          content: $scope.newComment
        };
        Comment.save(data, function() {
          $scope.newComment = '';
        });
      }
    };
  }]); //CommentCtrl ends