var googleKey = "GOOGLEKEY";
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

            storedResultsArr.push(results[i])

            var placeId = results[i].place_id;
            placeArr.push(placeId);
            console.log("TCL: callback -> placeArr", placeArr);
        }
    }
    placeDetails(placeArr[restIndex]);
}

var storedResultsArr = []
// *Location for current search results
var placeArr = [];

function createMarker(place) {
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });
// *Location for current search results

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
placeDetails(placeArr[restIndex]);
    displayRestaurant();
});
$("#like").on("click", function () {
    ////// todo Need to finalize
    likeArr.push(placeID);
    
    restIndex++;
    placeDetails(placeArr[restIndex]);
    displayRestaurant();
});

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
