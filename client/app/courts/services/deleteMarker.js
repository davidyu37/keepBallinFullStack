'use strict';

angular.module('keepballin') 
	.factory('DeleteMarker', ['socket', 'Api', function(socket, Api) {
		return function(id, scope) {
			deleteMarker(id);
			Api.delete(id)
				.then(function(data) {
					Api.get()
						.success(function(allCourts) {
							console.log('after get success');
					    	scope.courts = allCourts;
					    	socket.syncUpdates('court', scope.courts);
					    });	 
				});

			function setMapOnAll(map) {
				console.log('clear');
			 	for (var i = 0; i < scope.markers.length; i++) {
			    markers[i].setMap(map);
			  }
			}

			function deleteMarker(id) {
				console.log(id);
		        scope.markers[id].setMap(null);
		        scope.markers = [];

    		}
		}
	}]);