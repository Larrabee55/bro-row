var googleKey = "KEY";
var nextPage;
src = "https://maps.googleapis.com/maps/api/js?key=" + googleKey + "&libraries=places";

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



            var lat = response.results[0].geometry.location.lat;
            console.log("TCL: lat", lat);
            var long = response.results[0].geometry.location.lng;
            console.log("TCL: long", long);
            var placesUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "," + long + "&radius=5000&type=restaurant&googleKey=" + googleKey;
            console.log("TCL: placesUrl", placesUrl);

            // * API call for getting locations based off of longitude and latitude
            // $.ajax({
            //     method: "GET",
            //     type: "json",
            //     url: placesUrl,
            //     // Accept: "*/*",
            //     success: function (response) {
            //         console.log("TCL: response", response);

            //     }
            // });
        },

        error: function (error) {
            console.log(error);
        }
    });
});


// *Testing out APIs in a separate spot to keep making progress
var lat = "40.8911434";
var long = "-111.8925837";

var placesUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=" + googleKey;

service = new google.maps.places.PlacesService(map);
service.nearbySearch(request, callback);

$.ajax({
    url: "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=" + googleKey,
    type: 'GET',
    success: function (response) {
        console.log("TCL: response", response);
        nextPage = response.next_page_token;
        console.log("TCL: nextPage", nextPage);

    },
    error: function () {
        alert('Failed!');
    },

});