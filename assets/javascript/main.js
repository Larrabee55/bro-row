var zipCode = "84010";
var key = "AIzaSyBLJrE6KEfUSM16_1CCc0W_QFNSWDbkkx0";


var locationUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + zipCode + "&key=" + key;
console.log("TCL: locationUrl", locationUrl);

$.ajax({
    url: locationUrl,
    type: "json",
    method: "GET",
    success: function (response) {
        console.log("TCL: response", response.results[0].geometry.location);

        var lat = response.results[0].geometry.location.lat;
        console.log("TCL: lat", lat);
        var long = response.results[0].geometry.location.lng;
        console.log("TCL: long", long);
        var placesUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "," + long + "&radius=5000&type=restaurant&key=" + key;
        console.log("TCL: placesUrl", placesUrl);

        $.ajax({
            method: "GET",
            type: "json",
            url: placesUrl,
            success: function (response) {
                console.log("TCL: response", response);

            }
        });
    },

    error: function (error) {
        console.log(error);
    }
});