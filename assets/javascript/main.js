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
            console.log("TCL: callback -> results[i]", results[i]);
            console.log("TCL: callback -> results", results[i].name);
            createMarker(results[i]);

            var name = place.name

            storedResultsArr.push(results[i])

            var placeId = results[i].place_id;
            placeArr.push(placeId);
            console.log("TCL: callback -> placeArr", placeArr);
        }
    }
}


var storedResultsArr = []
// *Location for current search results
var placeArr = [];

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

var restIndex = 0

function displayRestaurant() {

    $("#restaurant").append("<div class='card'>");
    $("#restaurant").children(".card").append("<div class='card-image'>");
    $("#restaurant").children(".card").children(".card-image").append("<img id='image'>");
    $("#restaurant").children(".card").children(".card-image").append("<span class='card-title'>");
    $("#restaurant").children(".card").children(".card-image").children(".card-title").append(storedResultsArr[i].name)
    $("#image").attr("src=", results[i].photos[0].geturl());
    $("#restaurant").children(".card").append("<div class='card-content'>");
    $("#restaurant").children(".card").children(".card-content").append("<p> Resturant Rating: " + storedResultsArr[restIndex].rating);
    $("#restaurant").children(".card").children(".card-content").append("<p> Price: " + temp1[restIndex].price_level);

}

// submit button on click
// usersCity = true
// once out of place give option to grab more?
// Or search a different city
var usersCity = false;

if (!usersCity) {
    $("#dislike").on("click", function () {
        $("#restaurant").empty();
        restIndex++;
        displayRestaurant();


    });
    $("#like").on("click", function () {
        $("#restaurant").children(".card").addClass("liked");
        likedDiv()
        restIndex++;
        displayRestaurant();


    });
}




function likedDiv() {
    $("#liked-row").prepend("<div class='col m4 newLiked" + restIndex + "'>");
    $(".liked").appendTo(".newLiked" + restIndex);
    $(".card").removeClass("liked");

}

// $(".card-image").append(temp1[restIndex].photos.html_attributions)
// console.log(temp1[restIndex].photos[0].html_attributions)