import * as firebase from 'firebase';

 
 var firebaseConfig = {
    apiKey: "AIzaSyDG-5_R8Cnt-1NEGWky4F8jK4ZHDQo-egw",
    authDomain: "movie-review-app-aaeae.firebaseapp.com",
    databaseURL: "https://movie-review-app-aaeae.firebaseio.com",
    projectId: "movie-review-app-aaeae",
    storageBucket: "movie-review-app-aaeae.appspot.com",
    messagingSenderId: "811240105344",
    appId: "1:811240105344:web:dc02c371e14067116a4d65"
  };



  firebase.initializeApp(firebaseConfig);
  export default firebase;


