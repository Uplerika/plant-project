// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwNnTIul83hvzWY30BRai7uki0obM6lvY",
  authDomain: "react-plants-shop.firebaseapp.com",
  projectId: "react-plants-shop",
  storageBucket: "react-plants-shop.appspot.com",
  messagingSenderId: "1017344019271",
  appId: "1:1017344019271:web:e7b4363f3342605b571a62"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {db}

const auth = getAuth(app);

export {auth}
