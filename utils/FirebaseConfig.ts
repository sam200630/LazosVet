// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjCn2wPSRiE1Sx4iK--1_et8iNyJHOsxU",
  authDomain: "lazosvet.firebaseapp.com",
  projectId: "lazosvet",
  storageBucket: "lazosvet.firebasestorage.app",
  messagingSenderId: "328769882447",
  appId: "1:328769882447:web:960bd0c9cadd823b939d3a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };