// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCYNqELoRePlcIB8WXePpvn0xwzBoyspw",
  authDomain: "zero-hunger-979ab.firebaseapp.com",
  projectId: "zero-hunger-979ab",
  storageBucket: "zero-hunger-979ab.appspot.com",
  messagingSenderId: "365975174563",
  appId: "1:365975174563:web:51405b700be56048526e16",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
