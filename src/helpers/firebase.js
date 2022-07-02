// import  firebase from "firebase/app"
// import "firebase/auth"
import firebase from 'firebase'
require('firebase/auth')


var firebaseConfig = {
  apiKey: "AIzaSyB5IcDHgnDncyrkUXab7rT9eZnuryaX8NI",
  authDomain: "the-cv-tube-a0174.firebaseapp.com",
  databaseURL: "https://the-cv-tube-a0174-default-rtdb.firebaseio.com",
  projectId: "the-cv-tube-a0174",
  storageBucket: "the-cv-tube-a0174.appspot.com",
  messagingSenderId: "56503410117",
  appId: "1:56503410117:web:5211b6a5def408843a7fac",
  // measurementId: "G-4PQGQV2F17"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // firebase.analytics();
  
  export default firebase