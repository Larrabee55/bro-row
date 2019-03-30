//firebase

  // Initialize Firebase
var config = {
    apiKey: "",
    authDomain: "cuisineme-54bb8.firebaseapp.com",
    databaseURL: "https://cuisineme-54bb8.firebaseio.com",
    projectId: "cuisineme-54bb8",
    storageBucket: "cuisineme-54bb8.appspot.com",
    messagingSenderId: "908231338492"
};
firebase.initializeApp(config);

//firestore
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write;
    }
  }
  //take user data from button click event to store into database

//likes to view in favorites page
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var userName = childSnapshot.val().name;
    var placeId = childSnapshot.val().placeId;
    var likes = childSnapshot.val().likes;

    // User Info
    console.log(userName);
    console.log(placeId);
    console.log(likes);

}
//log in google
import firebase, {auth,provider} from 'firebase';

googleLogIn() {
    auth.signInWithPopup(provider).then(result => {
    console.log(result);
    });
}
//retrive data from log in 
<
  function gotData(data) {
    console.log(data);
  }
<script src="https://cuisineme-54bb8.firebaseio.com/rest/saving-data/fireblog/posts.json?callback=gotData"></script>


