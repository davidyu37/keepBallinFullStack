'use strict';

angular.module('keepballin') 
.directive('marker', ['$window', '$compile', '$q', function($window, $compile, $q) {
	return {
		restrict: 'A',
		scope: {
			courts: '=courts',
			map: '=map',
			markers: '=markers',
			infowindow: '=infowindow',
			editmode: '=editmode',
			deletemarker: '=deletemarker'

		},
		link: function($scope, $element) {
			
			var infowindow = $scope.infowindow;

			function cleanUpMarkers(oldVal) {
				$scope.markers[oldVal._id].setMap(null);
			};
			
			function createMarker(courts) {

				var marker = new google.maps.Marker({
		            map: $scope.map,
		            position: new google.maps.LatLng(courts.lat, courts.long),
		            title: courts.court,
		            id: courts._id
		        });

		        marker.content = courts.desc;
		        $scope.markers[marker.id] = marker;
                
		        google.maps.event.addListener(marker, 'click', function() {
		        	
			        $scope.marker = marker;

			        var infoContent = '<div id=\"infoWin_'+ marker.id + '\"';
			        infoContent += 'ng-include="\'app/courts/temp/info.html\'">';
	   				
	              	infowindow.setContent(infoContent);
	              	infowindow.open($scope.map, marker);
		            $scope.map.panTo({lat: courts.lat, lng: courts.long});
                  	$scope.$apply(function(){
                   		$compile(document.getElementById("infoWin_"+marker.id))($scope);
                	});
	        	});//Events listener ends here
			}; //createMarker fn ends here


			$scope.$watchCollection('courts', function(newVal, oldVal) {
				if (newVal && newVal.length) {
					//Clean up the old markers
					for (var j=0; j < oldVal.length; j++) {
						cleanUpMarkers(oldVal[j]);
					}
					$scope.markers = [];
					//convert the new group of courts to marker here
					for(var i=0; i < newVal.length; i ++) {
						createMarker(newVal[i]);
					}
					console.log('make new markers');
				}
			}, true);
		}

	}; //Return ends
}]);//Marker directive ends here