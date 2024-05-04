// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMX43azJgBlca-2ur5wrF0equUs2nO5NQ",
  authDomain: "comp303-project-61bb9.firebaseapp.com",
  projectId: "comp303-project-61bb9",
  storageBucket: "comp303-project-61bb9.appspot.com",
  messagingSenderId: "787399091614",
  appId: "1:787399091614:web:7319b779860fd18052e28f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


export { app, db, auth };

