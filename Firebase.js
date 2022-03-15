import firebase from 'firebase/compat/app';
import "firebase/compat/auth"
import "firebase/compat/firestore"
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrA_Wk4fN8qBwhYolYYc5mEy7uh1pt-BY",
  authDomain: "sharath-e1aa4.firebaseapp.com",
  databaseURL: "https://sharath-e1aa4-default-rtdb.firebaseio.com",
  projectId: "sharath-e1aa4",
  storageBucket: "sharath-e1aa4.appspot.com",
  messagingSenderId: "1024977021030",
  appId: "1:1024977021030:web:e24e354d4dfec2353625a7",
  measurementId: "G-4SC19YEV27"
};

// Initialize Firebase
const firebaseApp=firebase.initializeApp(firebaseConfig);

  const db=firebaseApp.firestore();//storing the data called database (information)
  const auth=firebase.auth();//authentication of login page.
  export {db , auth } ;