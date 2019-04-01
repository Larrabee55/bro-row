var googleKey = "AIzaSyBLJrE6KEfUSM16_1CCc0W_QFNSWDbkkx0";
var lat;
var long;
// *Location for current search results
var placeArr = [];
var likeArr = [];
src = "https://maps.googleapis.com/maps/api/js?key=" + googleKey + "&libraries=places";

$("#autocomplete").focus();

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDpBqC7FPC6ZNRLlKhjgV-g7wuq1Df3x9I",
  authDomain: "cuisineme-1553137168583.firebaseapp.com",
  databaseURL: "https://cuisineme-1553137168583.firebaseio.com",
  projectId: "cuisineme-1553137168583",
  storageBucket: "",
  messagingSenderId: "1031744844103"
};
var fire = firebase.initializeApp(config);
var db = firebase.database();


var form = document.querySelector('#dislike');
var roof = document.querySelector('#like');
//take user data from button click event to store into database

// For listening to changes on the database
// rootRef("userid").on("value", function (snapshot) {
//     likeArr = snapshot.likeArr;
// });
//   // Or pushing to the database
// form.clickEvent("#dislike", (e) => {
//     rootRef.collection(userid()).push()
//     dislikes: form.value
// });
// roof.addEventListener("#like", (e) => {
//   rootRef.collection(userid()).push()
//   likes: roof.value
// });


var rootRef = firebase.database().ref()
var userRef = db.ref("/users");


// key/email of user to 

var mainRef = rootRef.child('userId')

// $("#google").on("click", function () {
//     googleLogIn();
// });




// function googleLogIn() {
//     firebase.auth.signInWithPopup(firebase.provider).then(result => {
//         console.log(result);
//     });
// }
//retrive data from log in 
// googleLogIn();


$(document).on("click", "#dislike", function () {
  if (!noUsersCity) {
    dilikeArr.push(name);
    restIndex++;


    if (placeArr[restIndex] === undefined) {
      // creates a materialize button for when it is out of results
      $("#restaurant").empty().addClass("expand col m6 center-align").append("<button id='keep'> Keep searching?");
      $("#keep").attr("class", "btn waves-effect waves-dark grey");
    }
    placeDetails(placeArr[restIndex]);

  }
});
$(document).on("click", "#like", function () {

  if (!noUsersCity) {

    moveToLike();
  }
});

function moveToLike() {

    var closeImg = $("<img>").attr("src", "./assets/images/xbutton.png").addClass("close").val(placeArr[restIndex]);
    $("#restaurant").children(".card").addClass("liked" + likeIndex).prepend(closeImg);
    likeArr.push(placeArr[restIndex]);

    userRef.set(likeArr);
	console.log("TCL: moveToLike -> likeArr", likeArr);
    likedDiv();
    restIndex++;
    if (placeArr[restIndex] === undefined) {
        $("#restaurant").empty().addClass("expand col m6 center-align").append("<button id='keep'> Keep searching?");
        $("#keep").attr("class", "btn waves-effect waves-dark grey");
    }
    placeDetails(placeArr[restIndex]);
}

$(document).on("click", ".close", function () {
  var id = $(this).val();
  for (var i = 0; i < likeArr.length; i++) {
    if (likeArr[i] === id) {
      likeArr.splice(i, 1);
    }
  }
  userRef.set(likeArr);
  console.log("TCL: likeArr", likeArr);
});


// * On location input run API commands
// // * On Zip code input run API commands

$("#submit").on("click", function (event) {
  // enables the like and dislike buttons when sumbit button is pressed
  noUsersCity = false;
  event.preventDefault();

  var autocomplete = $("#autocomplete").val().trim();
  var locationUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + autocomplete + "&key=" + googleKey;


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
  placeArr = [];
  $("#restaurant").empty();

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

  for (var i = 0; i < placeArr.length; i++) {
    var element = placeArr[i];
    tempArr.push(element);
  }

  radius += 250;
  restIndex = 0;

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
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);

      var placeId = results[i].place_id;
      placeArr.push(placeId);
    }

  }

  for (var i = 0; i < placeArr.length; i++) {
    for (var j = 0; j < placeArr.length; j++) {
      if (tempArr[i] === placeArr[j]) {
        placeArr.splice(j, 1);
      }
    }
  }
  placeDetails(placeArr[restIndex]);
}




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

    //* This is where we are going to grab all of the data and set it up on the screen
    name = place.name;
    rating = place.rating;
    if (place.formatted_phone_number) {
      phone = place.formatted_phone_number;
    }
    if (place.photos) {
      photo = place.photos[0].getUrl({
        'maxWidth': 300,
        'maxHeight': 300
      });
    } else {
      photo = "./assets/images/No_image_available.png";
    }
    if (place.website) {
      website = place.website;
    } else {
      website = false;
    }

    address1 = place.address_components[0].short_name;
    address2 = place.address_components[1].short_name;
    address3 = place.address_components[2].short_name;
    address4 = place.address_components[3].short_name;

    displayRestaurant();
  });
}


// * Variables for displaying each search
var name;
var rating;
var phone;
var photo;
var website;
var address1;
var address2;
var address3;
var address4;
var dilikeArr = [];
var restIndex = 0;



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


// uses the information from the api calls and puts it into a card inside the resturants div
function displayRestaurant() {

  $("#restaurant").empty();
  var newDiv = $("<div>").addClass("card");
  var pic = $("<div>").addClass("card-image").append("<img src='" + photo + "' />");
  var title = $("<span>").addClass("card-title").append(name);
  var content = $("<div>").addClass("card-content").attr("style", "background-color:goldenrod");
  var addressCombined = $("<div>").append(address1 + " ").append(address2 + ", ").append(address3 + ", ").append(address4);
  var rate = $("<div>").append("Rating: " + rating);

  // todo would like for website to be an <a href> if possible

    var aTag = $("<a>")
    if (website) {
        aTag.attr("href", website);
        aTag.attr("target", "_blank");
        aTag.text("Website (Click me)")
        // var web = $("<a href=" + website + ">Website</a>");


  }
  var number = $("<div>").append("Phone: " + phone);

  content.append(title).append(rate).append(aTag).append(number).append(addressCombined);
  newDiv.append(pic).append(content);
  $("#restaurant").append(newDiv);


}
var likeIndex = 0;

// function for when the user clicks the like buttion it creates a column down in the liked resturant area
function likedDiv() {
  $("#liked-row").append("<div class='col m4 s12 newLiked" + likeIndex + " inner grid-item'>");
  $(".liked" + likeIndex).appendTo(".newLiked" + likeIndex);
  $(".card").removeClass("liked");
  likeIndex++;
}
// changes the  classes when the size of the window is smalled so that the buttons look right
$(window).resize(function () {
  var viewportWidth = $(window).width();
  if (viewportWidth < 601) {
    $("#like").removeClass("valign-wrapper").addClass("center-align");
    $("#dislike").removeClass("valign-wrapper").addClass("center-align");
  }
});
// changes the  classes when the size of the window is smalled so that the buttons look right
$(window).resize(function () {
  var viewportWidth = $(window).width();
  if (viewportWidth > 600) {
    $("#like").removeClass("center-align").addClass("valign-wrapper");
    $("#dislike").removeClass("center-align").addClass("valign-wrapper");
  }
});

rootRef.once("value").then(function (snapshot) {
  likeArr = snapshot.child("/users").val();
  console.log("TCL: likeArr", likeArr);

  for (var i = 0; i < likeArr.length; i++) {
    var likeId = likeArr[i];
    console.log("TCL: likeId", likeId);
    placeDetails(likeId);
    moveToLike();

  }


})