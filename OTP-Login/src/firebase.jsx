// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAiqs8DcfYBqgAhgbE3p-taTV7SGUBBEaw",
  authDomain: "otp-react-45cb3.firebaseapp.com",
  projectId: "otp-react-45cb3",
  storageBucket: "otp-react-45cb3.appspot.com",
  messagingSenderId: "624388788072",
  appId: "1:624388788072:web:5749cae6d59025ee0e10dd",
  measurementId: "G-0CB859T96D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);