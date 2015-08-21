'use strict';

angular.module('keepballin') 
	.factory('createMarker', ['$compile', function($compile) {
		return function(courts, scope, map, infoWindow) {
			var marker = new google.maps.Marker({
	            map: map,
	            position: new google.maps.LatLng(courts.lat, courts.long),
	            title: courts.court,
	            id: courts._id
	        });
	        marker.content = '<div class="infoWindowContent">' + courts.desc + '</div>';
	        
	        google.maps.event.addListener(marker, 'click', (function(){
	        	var infoContent = '<div id=\"infoWin_'+ courts._id + '\"><h2>'; 
		        infoContent += marker.title; 
		        infoContent += '</h2>'; 
		        infoContent += marker.content; 
		        infoContent += '<button class="editBtn btn-primary pull-right">編輯</button>';
		        infoContent += '</div>';

		        var onload = function() {
                  $scope.$apply(function(){
                   		$compile(document.getElementById("infoWin_"+marker.id))($scope);
                	});
              	}
              	console.log(infoWindow);

    //           	if (!infowindow[marker.id]) {
				// 	infowindow[marker.id] = new google.maps.InfoWindow({
				// 		content: content
				// 	});
				// 	google.maps.event.addListener(infowindow[marker.id], 'domready', function(a,b,c,d) {
    //                		onload();
	   //              });
				// }

				// if (!marker.get('open')) {
				// 	marker.set('open', true);
				// 	infowindow[marker.id].open(marker.get('map'), marker);
					
				// } else {
				// 	marker.set('open', false);
				// 	infowindow[marker.id].close();
				// }
		        
	            // infoWindow.setContent(infoContent);
	            // infoWindow.open(map, marker);
	            // map.panTo({lat: courts.lat, lng: courts.long});
	        }));//Events listener ends here

	        scope.markers.push(marker);
	        //Edit buttn
	        $('.editBtn').click(function() {
	        	console.log(this);
	        }); 
		}
	}]);//createMarker factory ends here