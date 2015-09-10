'use strict';

angular.module('keepballin')
  .factory('Download', ['$resource', function ($resource) {
    return $resource('/api/uploads/pictures/:court_id:id/:filename', 
    { id: '@id' }, {
      update: {
        method: 'PUT'
      }
	  });
  }]);
