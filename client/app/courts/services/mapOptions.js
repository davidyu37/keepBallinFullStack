'use strict';

angular.module('keepballin') 
	.factory('mapOptions', function() {
		return {
			//center is set at 捷運大安站
			center: new google.maps.LatLng(25.033259, 121.543565),
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
	});