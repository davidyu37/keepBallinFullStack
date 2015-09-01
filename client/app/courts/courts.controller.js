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

	    $scope.test = function(what) {
	    	console.log(what);
	    	console.log(what.files[0]);
	    }
	    //The current court user is looking at
	    $scope.currentcourt;
	    $scope.markernow;
		//Is the details of the court expanded?
		$scope.expanded = false;	   

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
    		console.log(court);
    		if(court) {
    			console.log(court._id);
    			Court.update({ id: court._id }, court);
    		}
    	};
    	//Logic for picture upload
    	$scope.uploadmode = function(pics) {
    		$scope.upload = !($scope.upload);
    		console.log(pics);
    		
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
				var hour
				if(i < 10) {
					hour = '0'+ i + '00'; 
				} else {
					hour = i + '00';
				}
				hours.push(hour);
			}
			return hours
		}

		//Convert object to array
		$scope.toArray = function(object) {
			var array = $.map(object, function(value, index) {
			    return [value];
			});
			return array;
		}
		/*The problem: After deleting smaller index element, 
		the bigger index element still contains the same index,
		which is bigger the than the objects length
		Therefore, the loop begins from 0, it get undefined
		*/
		//Solution: convert object to array on add and edit
		$scope.removeFromArray = function(hashKey, myObjs) {
			for(var i=0; i < myObjs.length; i++) {
				if(hashKey == myObjs[i].$$hashKey) {
					myObjs.splice(i, 1);
				}
			}
		}
		
		$scope.checkValue = function(value) {
			if (value) {
				console.log('add 1');
				return 1;
			} else {
				console.log('do nothing');
				angular.noop;
			}
		}

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
	    //Message on the button
	    $scope.addMode = "加地點";

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

