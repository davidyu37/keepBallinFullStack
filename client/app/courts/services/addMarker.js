'use strict';

angular.module('keepballin') 
	.factory('AddMarker', ['$q', 'socket', 'Court', function($q, socket, Court) {
		return function(state, scope, map) {
			if(state) {
				map.setOptions({ draggableCursor: 'crosshair' });

				var court = new Court();

	    		google.maps.event.addListener(map, 'click', function(event) {
	   				
					console.log('Lat: ' + event.latLng.H);
					console.log('Long: ' + event.latLng.L);

					var lat = event.latLng.H;
					var long = event.latLng.L;

					var address = coordinates_to_address(lat, long);
					address.then(function(result){
						var district = result.address_components[3].long_name;
						var city = result.address_components[4].long_name;
						court = {lat: lat, long: long, address: result.formatted_address, district: district, city: city};
						Court.save(court);
					});
					
				});
				
	    	} else {
	    		google.maps.event.clearListeners(map, 'click');
	    		map.setOptions({ draggableCursor: 'url(http://maps.google.com/mapfiles/openhand.cur), move' });
	    	}

	    	function coordinates_to_address(lat, lng) {

	    		var deferred = $q.defer();

	    		var geocoder = new google.maps.Geocoder;

			    var latlng = new google.maps.LatLng(lat, lng);

			    geocoder.geocode({'latLng': latlng}, function(results, status) {
			        if(status == google.maps.GeocoderStatus.OK) {
			            if(results[0]) {
			            	
			            	var address = results[0].formatted_address;
			                
			                deferred.resolve(results[0]);

			            } else {
			            	deffered.reject(alert('沒住址'));
			            }
			        } else {
			        	console.log('error');
			        }
			    });
			    return deferred.promise;
			} 
		}
	}]);