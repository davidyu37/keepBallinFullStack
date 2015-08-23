'use strict';

angular.module('keepballin') 
	.factory('AddMarker', ['socket', 'Court', function(socket, Court) {
		return function(state, scope, map) {
			if(state) {
				map.setOptions({ draggableCursor: 'crosshair' });
				scope.addMode = "加完了";

				var court = new Court();

	    		google.maps.event.addListener(map, 'click', function(event) {
					console.log('Lat: ' + event.latLng.G);
					console.log('Long: ' + event.latLng.K);

					court = {lat: event.latLng.G, long: event.latLng.K};

					Court.save(court, function(){
					});
				});
				
	    	} else {
	    		google.maps.event.clearListeners(map, 'click');
	    		map.setOptions({ draggableCursor: 'url(http://maps.google.com/mapfiles/openhand.cur), move' });
	    		scope.addMode = "加地點";
	    	} 
		}
	}]);