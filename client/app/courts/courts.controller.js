'use strict';

angular.module('keepballin')
	.controller('CourtsCtrl', ['$scope', '$window', '$animate', '$timeout', '$compile', 'socket', 'Panorama', 'mapOptions', 'Geolocate', 'AddMarker', 'Court', 'Auth',  
		function ($scope, $window, $animate, $timeout, $compile, socket, Panorama, mapOptions, Geolocate, AddMarker, Court, Auth) {
	    
		//Initialize map
	    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
	    var map = $scope.map;


	    //Panorama stuff from here
	    var panorama = map.getStreetView();
	    //Create an undefined var in order to check the current existence of the btn
	    var closeBtn;
	    //Declare google street view control
	    var streetViewControl = map.streetView.controls[google.maps.ControlPosition.RIGHT_CENTER];
	    //If user switch into panorama, add customized button, vice versa
	 	Panorama.addEvent(panorama, streetViewControl, closeBtn);
		//Panorama ends here

		//Authentication
		$scope.isLoggedIn = Auth.isLoggedIn();
	    $scope.isAdmin = Auth.isAdmin();
	    $scope.getCurrentUser = Auth.getCurrentUser();

	    //The current court user is looking at
	    $scope.currentcourt;
	    $scope.markernow;
		//Is the details of the court expanded?
		$scope.expanded = false;

		//Broadcast the currentcourt
		$scope.$watch('currentcourt._id', function(newVal, oldVal) {
	        if(newVal) {
	        	$scope.$broadcast('courtIdChanged', {newId: newVal});
	        }
	    });	   

	    //Empty markers
	    $scope.markers = [];
	    //Info window stuff	
	    $scope.infowindow = new google.maps.InfoWindow();
	    //Store courts from api
	    $scope.courts = [];
	    $scope.courts = Court.query(function(){
	    	console.log('Courts loaded');
	    });
	    //socket.io instant updates
	    socket.syncUpdates('court', $scope.courts);
		$scope.$on('$destroy', function () {
      		socket.unsyncUpdates('court');
    	});
	    //Add Marker begins here
	    //Enable add marker mode
	    $scope.enableAddMarker = function(state) {
	    	AddMarker(state, $scope, map);
    	};

    	$scope.deletemarker = function(id) {
    		var check = $window.confirm('確定要刪掉這個球場嗎？');
    		if (check) {	
	    		Court.remove({ id: id });
    		} else {
    			angular.noop;
    		}
    	};

    	//Prevent ng animate from firing on refresh
    	$animate.enabled(false);
    	$timeout(function () {
        	$animate.enabled(true);
    	}, 1000);

    	

    	//Logic for court editing page
    	$scope.editmode = function(court) {
    		$scope.edit = !($scope.edit);
    		if(court) {
    			console.log(court);
    			Court.update({ id: court._id }, court);
    		}
    	};
    	//Logic for picture upload
    	$scope.uploadmode = function() {
    		$scope.upload = !($scope.upload);
    	};

    	//Prevent the edit page from closing when clicking one the form
    	$scope.stopPropagate = function(event) {
    		event.stopPropagation();
    	};

    	//Logic for marker editing
    	$scope.finishedit = function(marker) {
    		console.log(marker);	
    		//Grab the court data according to its id
    		if(marker) {
    			var updated = Court.get({ id: marker.id });
    			updated.court = marker.title;
    			updated.desc = marker.content;
    			console.log(updated);
    			Court.update({ id: marker.id }, updated);
    		}
    		
    	};

    	//Options for the hours
		$scope.getHours = function() {
			var hours = [];
			for (var i = 0; i < 24; i++) {
				var hour;
				if(i < 10) {
					hour = '0'+ i + '00'; 
				} else {
					hour = i + '00';
				}
				hours.push(hour);
			}
			return hours;
		};

	    //Add Marker ends here
	    //Geolocate begins here
	    // Place geolocate button on map
	    var geoBtn = document.getElementById('geolocate');
	    map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(geoBtn);
	    $scope.userLocation = {};
	    var userLocation = $scope.userLocation;
	    // Geolocating function
	    $scope.geolocate = function() {Geolocate(userLocation, map)};
	    //Geolocate ends here
	    //Add the addMarker button to map
	    var addMarkerBtn = document.getElementById('addMarker');
	    map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(addMarkerBtn);
	    

}]);//mapCtrl ends here


