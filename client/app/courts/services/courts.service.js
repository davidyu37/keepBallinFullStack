'use strict';

angular.module('keepballin')
  .factory('Court', function ($resource) {
    return $resource('/api/courts/:id/:controller', {
      id: '@_id'
    },
    {
      update: {
        method: 'PUT',
        params: {

        }
      }
	  });
  });
