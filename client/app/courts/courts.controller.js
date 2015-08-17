'use strict';

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
	
angular.module('keepballin')
	.controller('CourtsCtrl', ['$scope', function ($scope) {

		var initialPos = new google.maps.LatLng(25.033259, 121.543565);

	    var mapOptions = {
	        //center is set at 捷運大安站
			center: initialPos,
			zoom: 15,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			disableDefaultUI: true,
			scrollwheel: false,
		    panControl: true,
		    panControlOptions: {
        		position: google.maps.ControlPosition.RIGHT_CENTER
    		},
    		mapTypeControl: true,
    		mapTypeControlOptions: {
    			position: google.maps.ControlPosition.RIGHT_BOTTOM,
    			style: google.maps.MapTypeControlStyle.DEFAULT
    		},
    		zoomControl: true,
    		zoomControlOptions: {
    			position: google.maps.ControlPosition.LEFT_CENTER,
    			style: google.maps.ZoomControlStyle.SMALL
    		},
    		streetViewControl:true
	    }

	    var panoControl = {
	    	disableDefaultUI: true,
	    	zoomControl: true,
	    	zoomControlOptions: {
	    		position: google.maps.ControlPosition.LEFT_CENTER
	    	},
	    	enableCloseButton: false
	    };

	    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

	    //Panorama stuff from here
	    var panorama = $scope.map.getStreetView();
	    //Create an undefined var in order to check the current existence of the btn
	    var closeBtn;
	    //If user switch into panorama, add customized button, vice versa
	    google.maps.event.addListener(panorama, 'visible_changed', function() {
		   
		    if (panorama.getVisible()) {
		        panorama.setOptions(panoControl);
		        //Prevent the button to be made if it exist
		        if (closeBtn === undefined) {
		        	closeBtn = document.createElement('button');
			        var glyph = document.createElement('span');
			        var theMap = document.getElementById('map');
			        closeBtn.className = "closeBtn";
			        closeBtn.title = "回地圖";
			        glyph.className = "glyphicon glyphicon-remove";
			        closeBtn.appendChild(glyph);
			        $scope.map.streetView.controls[google.maps.ControlPosition.RIGHT_CENTER].push(closeBtn);
			        //Add eventlistener to the button
			        google.maps.event.addDomListener(closeBtn, 'click', function() {
					    //Disable panorama
					    panorama.setVisible(false);
					    closeBtn = undefined;
					});
		       	} else {
		       		return
		       	}
		        
		    } else {
		    	//Remove button from control
		    	$scope.map.streetView.controls[google.maps.ControlPosition.RIGHT_CENTER].pop();
		    }
		});
	    //Panorama ends here

	    $scope.districts = districts;
	    
	    $scope.markers = [];

	    $scope.userLocation = {};
	    
	    var infoWindow = new google.maps.InfoWindow();
	    
	    var createMarker = function (info){
	        
	        var marker = new google.maps.Marker({
	            map: $scope.map,
	            position: new google.maps.LatLng(info.lat, info.long),
	            title: info.court
	        });
	        marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';
	        
	        google.maps.event.addListener(marker, 'click', function(){
	            infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
	            infoWindow.open($scope.map, marker);
	            $scope.map.panTo({lat: info.lat, lng: info.long});
	        });
	        
	        $scope.markers.push(marker);    
	    }
	    
	    // for (i = 0; i < courts.length; i++){
	    //     createMarker(courts[i]);
	    // }

	    // $scope.openInfoWindow = function(e, selectedMarker){
	    //     e.preventDefault();
	    //     google.maps.event.trigger(selectedMarker, 'click');
	    // }
	    
	    // Place geolocate button on map
	    var btn = document.getElementById('geolocate');
	    $scope.map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(btn);
	    
	    // Geolocating function
	    $scope.geolocate = function() {
	    	//Check if marker already exist
	    	if(!($.isEmptyObject($scope.userLocation))){
	    		//Clear marker on map and set empty object
            	$scope.userLocation.setMap(null);
            	$scope.userLocation = {};
        	}
      		
		    //declare an empty Marker, so we can clear the marker by accessing the setMap property
			$scope.userLocation = new google.maps.Marker();
	    	//clear the map of markers before adding new one
			//check if browser supports geolocation
			//.getCurrentPosition() takes two functions as parameter: one shows position, one show error
			if(navigator.geolocation) {
			  navigator.geolocation.getCurrentPosition(function(position) {
			    var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			    //create a new marker at the position of the user, important to not use var, so it can be cleared if we run getLocation again.
			    $scope.userLocation = new google.maps.Marker({
			      map: $scope.map,
			      position: pos,
			      animation: google.maps.Animation.DROP
			    });
			    //set center of map to user's position and zoom to 14
			    $scope.map.setCenter(pos);
			    $scope.map.setZoom(18);
			  }, function() {
			    handleNoGeolocation(true);
			  });
			} else {
			  // Browser doesn't support Geolocation
			  handleNoGeolocation(false);
			}
		}
		//callback function that handles the errors
		function handleNoGeolocation(errorFlag) {
		  if (errorFlag) {
		    var content = 'Error: The Geolocation service failed.';
		  } else {
		    var content = 'Error: Your browser doesn\'t support geolocation.';
		  }
		  //when there's errorFlag, it displays the error message in a new infowindow
		  var options = {
		    map: $scope.map,
		    position: initialPos,
		    content: content
		  };

		  var infowindow = new google.maps.InfoWindow(options);
		  $scope.map.setCenter(options.position);
		}
		// Place district selection dropdown on map
		var districtSelection = document.getElementById('districtSelect');
		$scope.map.controls[google.maps.ControlPosition.TOP_CENTER].push(districtSelection);
		//Fire displayDistrict() after the user clicks on the desired district
		$scope.displayDistrict = function(e, selectedDistrict){
			//e is the event that a tag triggers
			e.preventDefault();
			//selectedDistrict is the object that all the information about that district
			//Make markers for all the courts inside of the 
			for (var i = 0; i < selectedDistrict.courts.length; i++){
	        	createMarker(selectedDistrict.courts[i]);
	    	}
			// createMarker();
		};

}]);//mapCtrl ends here
