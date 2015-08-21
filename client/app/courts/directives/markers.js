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
			
			function createMarker(courts) {

				var marker = new google.maps.Marker({
		            map: $scope.map,
		            position: new google.maps.LatLng(courts.lat, courts.long),
		            title: courts.court,
		            id: courts._id
		        });

		        marker.content = courts.desc;
		        $scope.markers[marker.id] = marker;
                
		        google.maps.event.addListener(marker, 'click', (function(event) {
		        	// var infoContent = '<div id=\"infoWin_'+ courts._id + '\"><h2>'; 
			        // infoContent += marker.title; 
			        // infoContent += '</h2>'; 
			        // infoContent += marker.content; 
			        // infoContent += '<button class="editBtn btn-primary pull-right" ng-click="editmode()">編輯</button>';
			        // infoContent += '</div>';
			        $scope.marker = marker;

			       
			        var infoContent = '<div id=\"infoWin_'+ marker.id + '\"';
			        infoContent += 'ng-include="\'app/courts/temp/info.html\'">';
	   				
	              	infowindow.setContent(infoContent);
	              	infowindow.open($scope.map, marker);
		            $scope.map.panTo({lat: courts.lat, lng: courts.long});
                  	$scope.$apply(function(){
                   		$compile(document.getElementById("infoWin_"+marker.id))($scope);
                	});


	              	
	        	}));//Events listener ends here
			}; //createMarker fn ends here


			$scope.$watch('courts', function(newVal, oldVal) {
				if (newVal && newVal.length) {
					//convert the new group of courts to marker here
					for(var i=0; i < newVal.length; i ++) {
						createMarker(newVal[i]);
					}
				}
			}, true);
		}

	}; //Return ends
}]);//Marker directive ends here