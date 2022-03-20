import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBBdJRQwjjutTwtqP1ghFni46-zCzvl1n0",
  authDomain: "dinnerdart-8ad0b.firebaseapp.com",
  projectId: "dinnerdart-8ad0b",
  storageBucket: "dinnerdart-8ad0b.appspot.com",
  messagingSenderId: "725198365988",
  appId: "1:725198365988:web:3fecc5cbae6d983c35ffb1",
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

// timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, projectStorage, timestamp };
