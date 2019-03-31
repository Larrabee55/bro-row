//firebase

  var fire = firebase.initializeApp(config);
  console.log(fire);
  
  var form = document.querySelector('#dislike');
  var roof = document.querySelector('#like');
//take user data from button click event to store into database

// For listening to changes on the database
rootRef("userid").on("value", function (snapshot){
  likeArr = snapshot.likeArr;
  });
  // Or pushing to the database
  rootRef("userid").push(likeArr);
// form.addEventListener("#dislike", (e) => {
//     rootRef.collection(userid).add
//     dislikes: form.restID.value
// });
// roof.addEventListener("#like", (e) => {
//   rootRef.collection(userid).add
//   likes: form.restID.value
// });


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





function googleLogIn(){
  firebase.auth.signInWithPopup(firebase.provider).then(result => {
    console.log(result);
  });
}
//retrive data from log in 
  googleLogIn()