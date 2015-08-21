'use strict';

angular.module('keepballin') 
	.factory('EditMarker', ['socket', 'Api', function(socket, Api) {
		return function(state, scope, map) {
		// 	if(state) {
				
		// 		scope.editmode = "加完了";

	 //    		google.maps.event.addListener(map, 'click', function(event) {
		// 			console.log('Lat: ' + event.latLng.G);
		// 			console.log('Long: ' + event.latLng.K);
		// 			Api.create({lat: event.latLng.G, long: event.latLng.K})
		// 				.success(function(latlng){
		// 					placeMarker(event.latLng);
		// 					Api.get()
		// 					.success(function(allCourts) {
		// 				      scope.courts = allCourts;
		// 				      socket.syncUpdates('court', scope.courts);
		// 				    })	
		// 				});
					
		// 		});
				
		// 	    function placeMarker(location) {
		// 	        var clickedLocation = new google.maps.LatLng(location);
		// 	        var marker = new google.maps.Marker({
		// 	            position: location,
		// 	            map: map
		// 	        });
	 //    		}
	 //    	} else {
	 //    		console.log('disabled');
	 //    		google.maps.event.clearListeners(map, 'click');
	 //    		map.setOptions({ draggableCursor: 'url(http://maps.google.com/mapfiles/openhand.cur), move' });
	 //    		scope.mode = "加地點";
	 //    	} 
		}
	}]);