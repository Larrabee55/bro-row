//firebase
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAI8r-ucedQnCXCVs6QfREqBVCV8JWzL7g",
    authDomain: "cuisineme-54bb8.firebaseapp.com",
    databaseURL: "https://cuisineme-54bb8.firebaseio.com",
    projectId: "cuisineme-54bb8",
    storageBucket: "cuisineme-54bb8.appspot.com",
    messagingSenderId: "908231338492"
  };
  firebase.initializeApp(config);
//take user data from button click event to store into database
//likes to view in favorites page
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var userName = childSnapshot.val().name;
    var dislikes = childSnapshot.val().dislikes;
    var placeId = childSnapshot.val().placeId;
    var likes = childSnapshot.val().likes;

    // User Info
    console.log(userName);
    console.log(dislikes);
    console.log(placeId);
    console.log(likes);
//dislikes to not show again

//log in google
import firebase, {auth,provider} from 'firebase';

googleLogIn() {
    auth.signInWithPopup(provider).then(result => {
    console.log(result);
    });
}
//retrive data from log in 
