//firebase
//take user data from button click event to store into database
//likes to view in favorites page
//dislikes to not show again
//maybes to view later
//log in google
//retrive data from log in 
import firebase, {auth,provider} from 'firebase';

googleLogIn() {
    auth.signInWithPopup(provider).then(result => {
    console.log(result);
    });
}