var restIndex = 0;
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


function displayRestaurant() {

  $("#restaurant").append("<div class='card'>");
  $("#restaurant").children(".card").append("<div class='card-image'>");
  $("#restaurant").children(".card").children(".card-image").append("<img id='image'>");
  $("#restaurant").children(".card").children(".card-image").append("<span class='card-title'>");
  $("#restaurant").children(".card").children(".card-image").children(".card-title").append(temp1[restIndex].name)
  $("#image").attr("src", "assets/css/2web.jpg");
  $("#restaurant").children(".card").append("<div class='card-content'>");
  $("#restaurant").children(".card").children(".card-content").append("<p> Resturant Rating: " + temp1[restIndex].rating);
  $("#restaurant").children(".card").children(".card-content").append("<p> Price: " + temp1[restIndex].price_level);

  // console.log(temp1[restIndex].photos[0].html_attributions)
}

function likedDiv() {
  $("#liked-row").prepend("<div class='col m4 newLiked" + restIndex + "'>");
  $(".liked").appendTo(".newLiked" + restIndex);
  $(".card").removeClass("liked");
}