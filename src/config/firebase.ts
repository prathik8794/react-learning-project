// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDW5Af7wAdoEIq-5C1cTurKVEhY51XZkrE",
  authDomain: "react-firebase-project-82a95.firebaseapp.com",
  projectId: "react-firebase-project-82a95",
  storageBucket: "react-firebase-project-82a95.appspot.com",
  messagingSenderId: "985208716625",
  appId: "1:985208716625:web:ca13cc3a92f8d3b76ae770",
  measurementId: "G-6GYWGSRKEC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
//creating a database
export const db = getFirestore(app);