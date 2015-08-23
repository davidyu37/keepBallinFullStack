'use strict';

angular.module('keepballin')
  .factory('Court', ['$resource', function ($resource) {
    return $resource('/api/courts/:id', 
    { id: '@id' }, {
      update: {
        method: 'PUT'
      }
	  });
  }]);
