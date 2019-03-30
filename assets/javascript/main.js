var googleKey = "KEY";
var lat;
var long;

src = "https://maps.googleapis.com/maps/api/js?key=" + googleKey + "&libraries=places";
var noUsersCity = true;

// * On location input run API commands
$("#submit").on("click", function (event) {
    noUsersCity = false;
    console.log(noUsersCity)
    event.preventDefault();

    var autocomplete = $("#autocomplete").val().trim();
    var locationUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + autocomplete + "&key=" + googleKey;


    if (!noUsersCity) {
        $("#dislike").on("click", function () {
            dilikeArr.push(name);
            restIndex++;
            console.log("TCL: placeArr[restIndex]", placeArr[restIndex]);
            placeDetails(placeArr[restIndex]);
            if (placeArr[restIndex] === undefined) {
                $("#restaurant").empty().addClass("expand").append("<button> Keep searching?");
            }
        });
        $("#like").on("click", function () {
            $("#restaurant").children(".card").addClass("liked");
            likeArr.push(placeArr[restIndex]);
            likedDiv();
            restIndex++;
            console.log("TCL: placeArr[restIndex]", placeArr[restIndex]);
            placeDetails(placeArr[restIndex]);
            if (placeArr[restIndex] === undefined) {
                $("#restaurant").empty().addClass("expand").append("<button> Keep searching?");
            }
        });
    }


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
    radius = 500;
    restIndex = 0;

    tempArr = [];

    map = new google.maps.Map(document.getElementById('map'), {
        center: location,
        zoom: 15
    });

    var request = {
        location: location,
        radius: radius,
        type: ['restaurant']
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
}

var radius;
var tempArr = [];

function expandSearch() {
    var location = new google.maps.LatLng(lat, long);

    tempArr = placeArr;

    radius += 500;
    restIndex = 0;
    console.log("TCL: expandSearch -> radius", radius);

    map = new google.maps.Map(document.getElementById('map'), {
        center: location,
        zoom: 15
    });

    var request = {
        location: location,
        radius: radius,
        type: ['restaurant']
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
}

$(document).on("click", ".expand", function () {
    expandSearch();
});

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

// todo Needs some work to be able to splice tempArr from placeArr

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        placeArr = [];
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);

            var placeId = results[i].place_id;
            placeArr.push(placeId);
        }
    }

    for (var i = 0; i < placeArr.length; i++) {
        for (var j = 0; j < placeArr.length; j++) {
            if (tempArr[j] === placeArr[j]) {
                placeArr.splice(j, 1);
            }
        }
    }

    console.log("TCL: callback -> placeArr", placeArr);
    placeDetails(placeArr[restIndex]);
}

// *Location for current search results
var placeArr = [];

function createMarker(place) {
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });
    // *Location for current search results


}


// *Get place details
function placeDetails(place) {
    var request = {
        placeId: place,
        fields: ['name', 'rating', 'formatted_phone_number', 'photos', 'website', 'address_components'],
    };

    service.getDetails(request, (place) => {
        console.log("TCL: placeDetails -> place", place);

        //* This is where we are going to grab all of the data and set it up on the screen
        name = place.name;
        rating = place.rating;
        if (place.formatted_phone_number){
        phone = place.formatted_phone_number;
        }
        photo = place.photos[0].getUrl({
            'maxWidth': 300,
            'maxHeight': 300
        });
        if(place.website){
        website = place.website;
        }


        displayRestaurant();
    });
};


// * Variables for displaying each search
var name;
var rating;
var phone;
var photo;
var website;
var likeArr = [];
var dilikeArr = [];

// todo Need address components


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


// todo Need to work on displaying the content

function displayRestaurant() {


    $("#restaurant").empty();
    var newDiv = $("<div>").addClass("card");
    var pic = $("<div>").addClass("card-image").append("<img src='" + photo + "' />");
    var title = $("<span>").addClass("card-title").append(name);
    var content = $("<div>").addClass("card-content");
    var rate = $("<div>").append("Rating: " + rating);


    // todo would like for website to be an <a href> if possible

    var web = $("<div>").append("Website: " + website);
    var number = $("<div>").append("Phone: " + phone);

    content.append(title).append(rate).append(web).append(number);
    newDiv.append(pic).append(content);
    $("#restaurant").append(newDiv);

    // $("#restaurant").empty();
    // $("#restaurant").append("<div class='card'>");
    // $("#restaurant").children(".card").append("<div class='card-image'>");
    // $("#restaurant").children(".card").children(".card-image").append(photo);
    // $("#restaurant").children(".card").children(".card-image").append("<span class='card-title'>");
    // $("#restaurant").children(".card").children(".card-image").children(".card-title").append(name)
    // $("#image").attr(photo);
    // $("#restaurant").children(".card").append("<div class='card-content'>");
    // $("#restaurant").children(".card").children(".card-content").append("<p> Resturant Rating: " + rating);
    // $("#restaurant").children(".card").children(".card-content").append("<a href=" + website + "><p> Website: " + website + "</p></a>");

}

// submit button on click
// usersCity = true
// once out of place give option to grab more?
// Or search a different city
var usersCity = false;

function likedDiv() {
    $("#liked-row").prepend("<div class='col m4 newLiked" + restIndex + "'>");
    $(".liked").appendTo(".newLiked" + restIndex);
    $(".card").removeClass("liked");

}