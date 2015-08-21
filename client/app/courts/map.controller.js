'use strict';

angular.module('keepballin')
	.controller('MapCtrl', ['$scope', '$compile', 'socket', 'Panorama', 'mapOptions', 'createMarker', 'Geolocate', 'Api', 'AddMarker', function ($scope, $compile, socket, Panorama, mapOptions, createMarker, Geolocate, Api, AddMarker) {
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
	    $scope.markers = [];
	    $scope.districts = districts;
	    //Info window stuff
	    var infoWindow = new google.maps.InfoWindow();

	    //Store courts from api
	    $scope.courts = [];
	    Api.get().success(function(allCourts) {
	      $scope.courts = allCourts;
	      socket.syncUpdates('court', $scope.courts);
	      console.log($scope.courts);
	      for (var i=0; i < allCourts.length; i++) {
	      	createMarker(allCourts[i], $scope, map, infoWindow);
	      };
	    });
	    //Add Marker begins here
	    //Add the addMarker button to map
	    var addMarkerBtn = document.getElementById('addMarker');
	    map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(addMarkerBtn);
	    //Message on the button
	    $scope.mode = "加地點";
	    
	    //Enable add marker mode
	    $scope.enableAddMarker = function(state) {
	    	AddMarker(state, $scope, map, infoWindow);
	   		
	 
    	};

    	$scope.editMode = function(state) {
    		console.log('Editmode');
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

		// Place district selection dropdown on map
		var districtSelection = document.getElementById('districtSelect');
		map.controls[google.maps.ControlPosition.TOP_CENTER].push(districtSelection);
		//Fire displayDistrict() after the user clicks on the desired district
		$scope.displayDistrict = function(e, selectedDistrict, $scope){
			//e is the event that a tag triggers
			e.preventDefault();
			//selectedDistrict is the object that all the information about that district
			//Make markers for all the courts inside of the 
			for (var i = 0; i < selectedDistrict.courts.length; i++){
	        	createMarker(selectedDistrict.courts[i], map, markers, infoWindow);
	    	}
			// createMarker();
		};

}]);//mapCtrl ends here

//Data
var districts = [
	{
		name: '北投區',
		courts: []
	},
	{
		name: '士林區',
		courts: []
	},
	{
		name: '內湖區',
		courts: []
	},
	{
		name: '中山區',
		courts: []
	},
	{
		name: '大同區',
		courts: []
	},
	{
		name: '松山區',
		courts: []	
	},
	{
		name: '萬華區',
		courts: []	
	},
	{
		name: '中正區',
		courts: []	
	},
	{
		name: '大安區',
		courts: [
		    {
		        court : '台北科技大學',
		        desc : 'This is the best court in the world!',
		        lat : 25.043204,
		        long : 121.537544
		    },
		    {
		        court : '仁愛國中',
		        desc : 'This court is aiiiiite!',
		        lat : 25.036629,
		        long : 121.550943
		    },
		    {
		        court : '懷生國中',
		        desc : 'This is the second best court in the world!',
		        lat : 25.040370,
		        long : 121.540789
		    },
		    {
		        court : '師大附中',
		        desc : 'This court is live!',
		        lat : 25.035833,
		        long : 121.540549
		    },
		    {
		        court : '延平中學',
		        desc : 'Sin court...\'nuff said!',
		        lat : 25.036516,
		        long : 121.538686
		    }
		]
	},
	{
		name: '信義區',
		courts: []	
	},
	{
		name: '南港區',
		courts: []	
	},
	{
		name: '文山區',
		courts: []	
	}
];

