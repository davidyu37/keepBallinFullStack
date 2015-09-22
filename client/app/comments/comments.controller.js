'use strict';
 
angular.module('keepballin')
  .controller('CommentCtrl', ['$scope', '$q', 'socket','Comment', 'Auth', 'CommentSource', function ($scope, $q, socket, Comment, Auth, CommentSource) {
    $scope.newComment = '';
 
    $scope.avatar = Auth.getCurrentUser().avatar;

    $scope.profile = 'app/profile/profile.html';

    function checkAllComments(courtId) {
      var deferred = $q.defer();
      Comment.query({courtId: courtId},function(comments) {
          if(comments.length) {
              deferred.resolve(comments.length);
          } else {
            deferred.reject(console.log('do nothing'));
          }
      });
      return deferred.promise;
    };

    $scope.$on('courtIdChanged', function(e, args) {
      $scope.comments = {};
      var check = checkAllComments(args.newId);
      check.then(function(length) {
        $scope.comments = new CommentSource(args.newId, length);
      });
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
        var courtID = $scope.currentcourt._id;
        var data = {
          courtId: courtID,
          content: $scope.newComment
        };
        Comment.save(data, function() {
          $scope.newComment = '';
          var check = checkAllComments(courtID);
          check.then(function(length) {
            $scope.comments = new CommentSource(courtID, length);
            $scope.comments.nextPage();
          });
        });
      }
    };

  }]); //CommentCtrl ends