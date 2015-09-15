'use strict';

angular.module('keepballin')
  .factory('Comment', ['$resource', function ($resource) {
    return $resource('/api/comments/:courtId:id', 
    { id: '@id' }, {
      update: {
        method: 'PUT'
      }
	  });
  }]);