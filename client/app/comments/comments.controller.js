'use strict';
 
angular.module('keepballin')
  .controller('CommentCtrl', ['$scope', '$http', 'socket','Comment', function ($scope, $http, socket, Comment) {
    $scope.newComment = '';
 
   
    // $http.get('/api/comments').success(function(comments) {
    //   $scope.comments = comments;
    //   console.log(comments);
    //   // Update array with any new or deleted items pushed from the socket
    //   socket.syncUpdates('comment', $scope.comments, function(event, comment, comments) {
    //     // This callback is fired after the comments array is updated by the socket listeners
 
    //     // sort the array every time its modified
    //     comments.sort(function(a, b) {
    //       a = new Date(a.date);
    //       b = new Date(b.date);
    //       return a>b ? -1 : a<b ? 1 : 0;
    //     });
    //   });
    // });

    $scope.getComments = function(courtId) {
      console.log('get comments');

      var pics = Comment.query({court_id: courtId},function(comments) {
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
      console.log('add');
      if(!$scope.currentcourt) {
        angular.noop;
      } else {
        var data = {
          court_id: $scope.currentcourt._id,
          content: $scope.newComment
        }
        Comment.save(data, function() {
          $scope.newComment = '';
        });
      }

    };
  }]); //CommentCtrl ends