'use strict';

angular.module('keepballin')
  .factory('Comment', ['$resource', function ($resource) {
    return $resource('/api/comments/:court_id:id', 
    { id: '@id' }, {
      update: {
        method: 'PUT'
      }
	  });
  }]);