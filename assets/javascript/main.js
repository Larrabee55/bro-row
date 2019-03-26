var googleKey = "AIzaSyBLJrE6KEfUSM16_1CCc0W_QFNSWDbkkx0";
var lat;
var long;
// src = "https://maps.googleapis.com/maps/api/js?key=" + googleKey + "&libraries=places";

// * On Zip code input run API commands
$("#submit").on("click", function (event) {

    event.preventDefault();
    var zipCode = $("#search-zip").val();
    var locationUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + zipCode + "&key=" + googleKey;


    //* API call for retrieving longitude and latitude from zip
    $.ajax({
        url: locationUrl,
        type: "json",
        method: "GET",
        success: function (response) {
            console.log("TCL: locationUrl", locationUrl);
            console.log("TCL: response", response.results[0].geometry.location);



            lat = response.results[0].geometry.location.lat;
            console.log("TCL: lat", lat);
            long = response.results[0].geometry.location.lng;
            console.log("TCL: long", long);

            initializeSearch();

        },

        error: function (error) {
            console.log(error);
        }
    });
});


// *Copied from "Find Places Nearby" https://developers.google.com/maps/documentation/javascript/places#place_search_requests

var map;
var service;
var infowindow;

function initializeSearch() {
    var location = new google.maps.LatLng(lat, long);

    map = new google.maps.Map(document.getElementById('map'), {
        center: location,
        zoom: 15
    });

    var request = {
        location: location,
        radius: '500',
        type: ['restaurant']
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            console.log("TCL: callback -> results[i]", results[i]);
            console.log("TCL: callback -> results", results[i].name);
            createMarker(results[i]);

            var name = place.name
        }
    }
}

function createMarker(place) {
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}