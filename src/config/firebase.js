import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCz75uABCasx5E5J9SgPzUx7QxF4crs9Uc",
  authDomain: "iwds-ds-3001.firebaseapp.com",
  databaseURL: "https://iwds-ds-3001-default-rtdb.firebaseio.com",
  projectId: "iwds-ds-3001",
  storageBucket: "iwds-ds-3001.appspot.com",
  messagingSenderId: "1032479134810",
  appId: "1:1032479134810:web:81b0e5209b3c3d1769f463",
  measurementId: "G-WC9WRQ1JYM"
};

const app = initializeApp(firebaseConfig);
console.log("Connected to Firebase");

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);