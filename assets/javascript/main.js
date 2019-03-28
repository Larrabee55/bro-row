var googleKey = "AIzaSyBLJrE6KEfUSM16_1CCc0W_QFNSWDbkkx0";
var lat;
var long;
src = "https://maps.googleapis.com/maps/api/js?key=" + googleKey + "&libraries=places";

// // * On Zip code input run API commands
$("#submit").on("click", function (event) {

    event.preventDefault();
    //     initializeSearch();
    // });
    var zipCode = $("#search-zip").val();
    var locationUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + zipCode + "&key=" + googleKey;


    //* API call for retrieving longitude and latitude from zip
    $.ajax({
        url: locationUrl,
        type: "json",
        method: "GET",
        success: function (response) {



            lat = response.results[0].geometry.location.lat;
            long = response.results[0].geometry.location.lng;

            initializeSearch();

        },

        error: function (error) {
            console.log(error);
        }
    });
});



var service;
var infowindow;

var map, places, infoWindow;
var markers = [];
var autocomplete;
var countryRestrict = {
    'country': 'us'
};
var MARKER_PATH = 'https://developers.google.com/maps/documentation/javascript/images/marker_green';
var hostnameRegexp = new RegExp('^https?://.+?/');

var countries = {
    'us': {
        center: {
            lat: 37.1,
            lng: -95.7
        },
        zoom: 3
    },
};

autocomplete = new google.maps.places.Autocomplete(
    /** @type {!HTMLInputElement} */
    (
        document.getElementById('autocomplete')), {
        types: ['(cities)'],
        componentRestrictions: countryRestrict
    });
places = new google.maps.places.PlacesService(map);

autocomplete.addListener('place_changed', onPlaceChanged);

// *Copied from "Find Places Nearby" https://developers.google.com/maps/documentation/javascript/places#place_search_requests

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

function onPlaceChanged() {
    var place = autocomplete.getPlace();
    if (place.geometry) {
        map.panTo(place.geometry.location);
        map.setZoom(15);
        search();
    } else {
        document.getElementById('autocomplete').placeholder = 'Enter a city';
    }
}

function search() {
    var search = {
        bounds: map.getBounds(),
        types: ['restaurant']
    };

    places.nearbySearch(search, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            clearResults();
            clearMarkers();
            // Create a marker for each hotel found, and
            // assign a letter of the alphabetic to each marker icon.
            for (var i = 0; i < results.length; i++) {
                var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
                var markerIcon = MARKER_PATH + markerLetter + '.png';
                // Use marker animation to drop the icons incrementally on the map.
                markers[i] = new google.maps.Marker({
                    position: results[i].geometry.location,
                    animation: google.maps.Animation.DROP,
                    icon: markerIcon
                });
                // If the user clicks a hotel marker, show the details of that hotel
                // in an info window.
                markers[i].placeResult = results[i];
                google.maps.event.addListener(markers[i], 'click', showInfoWindow);
                setTimeout(dropMarker(i), i * 100);
                addResult(results[i], i);
            }
        }
    });
}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            createMarker(results[i]);

            var name = place.name

            var placeId = results[i].place_id;
            placeArr.push(placeId);

        }
    }
    placeDetails(placeArr[restIndex]);
}

// *Location for current search results
var placeArr = [];
var likeArr = [];
var dilikeArr = [];


// *Get place details
function placeDetails(place) {
    var request = {
        placeId: place,
        fields: ['name', 'rating', 'formatted_phone_number', 'photos', 'website'],
    };

    service.getDetails(request, (place) => {

        //////////////////////////////////
        //* This is where we are going to grab all of the data and set it up on the screen
        name = place.name;
        rating = place.rating;
        // phone = place.phone...;
        // photo = place.photos....;
        website = place.website;

        displayRestaurant();
    });
};

var name;
var rating;
var phone;
var photo;
var website;


// todo set up process to cycle through the different place id


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

var restIndex = 0;
console.log("TCL: restIndex", restIndex);



$("#dislike").on("click", function () {
    restIndex++;
    displayRestaurant();
});
$("#like").on("click", function () {
    ////// todo Need to finalize
    likeArr.push(placeID);
    
    restIndex++;
    displayRestaurant();
});

function displayRestaurant() {
    $("#restaurant").empty();
    $("#restaurant").append("<div class='card'>");
    $(".card").append("<div class='card-image'>");
    $(".card-image").append("<img id='image'>");
    $(".card-image").append("<span class='card-title'>");
    $(".card-title").append(name);
    $("#image").attr("src", temp1[restIndex].photos[0].html_attributions);
    $(".card").append("<div class='card-content'>");
    $(".card-content").append("<p> Resturant Rating: " + temp1[restIndex].price_level);
    $(".card-content").append("<p> Price: " + temp1[restIndex].rating);
    console.log(temp1[restIndex].photos[0].html_attributions)
}

// $(".card-image").append(temp1[restIndex].photos.html_attributions)
// console.log(temp1[restIndex].photos[0].html_attributions)
