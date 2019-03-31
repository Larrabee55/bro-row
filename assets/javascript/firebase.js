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
  var fire = firebase.initializeApp(config);
  console.log(fire);
  
//take user data from button click event to store into database


var rootRef = firebase.database().ref()
console.log(rootRef);

//likes to view in favorites page
  rootRef.once("value").then(function(snapshot) {
    var likes = snapshot.child().val()
    console.log(snapshot.val());
    var likedRow =document.getElementById("liked-row")
    console.log(likedRow) 
})
// key/email of user to 

var mainRef=rootRef.child('userId')
 //.set to push it 


// function googleLogIn(){
//   firebase.auth.signInWithPopup(firebase.provider).then(result => {
//     console.log(result);
//   });
// }
// //retrive data from log in 
// googleLogIn()