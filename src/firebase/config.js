import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBBdJRQwjjutTwtqP1ghFni46-zCzvl1n0",
  authDomain: "dinnerdart-8ad0b.firebaseapp.com",
  projectId: "dinnerdart-8ad0b",
  storageBucket: "dinnerdart-8ad0b.appspot.com",
  messagingSenderId: "725198365988",
  appId: "1:725198365988:web:3fecc5cbae6d983c35ffb1",
};

// init firebase
initializeApp(firebaseConfig);

// init firestore
const db = getFirestore();

// init firebase auth
const auth = getAuth();

export { db, auth };
