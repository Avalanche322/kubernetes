import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBe6qBKYWwvPKdEWZL39nzvX1kb77O0dLA",
  authDomain: "todov-dev.firebaseapp.com",
  databaseURL: "https://todov-dev-default-rtdb.firebaseio.com",
  projectId: "todov-dev",
  storageBucket: "todov-dev.appspot.com",
  messagingSenderId: "882051731447",
  appId: "1:882051731447:web:0cd1d41db3f48254d4e8f2",
  measurementId: "G-SQMCJVBY2V"
};

firebase.initializeApp(firebaseConfig);

export default firebase
