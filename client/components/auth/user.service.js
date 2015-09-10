'use strict';

angular.module('keepballin')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      changeName: {
        method: 'PUT',
        params: {
          controller: 'name'
        }
      },
      changeEmail: {
        method: 'PUT',
        params: {
          controller: 'email'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
	  });
  });
