'use strict';

angular.module('keepballin') 
	.factory('AddMarker', ['socket', 'Api', 'createMarker', function(socket, Api, createMarker) {
		return function(state, scope, map, infoWindow) {
			if(state) {
	    		google.maps.event.addListener(map, 'click', function(event) {
					console.log('Lat: ' + event.latLng.G);
					console.log('Long: ' + event.latLng.K);
					Api.create({lat: event.latLng.G, long: event.latLng.K})
						.success(function(latlng){
							placeMarker(event.latLng);
							Api.get()
							.success(function(allCourts) {
						      scope.courts = allCourts;
						      socket.syncUpdates('court', scope.courts);
						      for (var i=0; i < allCourts.length; i++) {
						      	createMarker(allCourts[i], scope, map, infoWindow);
						      };
						    })	
						});
					
				});
				map.setOptions({ draggableCursor: 'crosshair' });
				scope.mode = "加完了";
				
		    
			    function placeMarker(location) {
			        var clickedLocation = new google.maps.LatLng(location);
			        var marker = new google.maps.Marker({
			            position: location,
			            map: map
			        });
			        scope.markers.push(marker);
	    		}
	    	} else {
	    		console.log('disabled');
	    		google.maps.event.clearListeners(map, 'click');
	    		map.setOptions({ draggableCursor: 'url(http://maps.google.com/mapfiles/openhand.cur), move' });
	    		scope.mode = "加地點";
	    	} 
		}
	}]);