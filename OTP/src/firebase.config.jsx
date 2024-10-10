// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArqILKcEUgK_ErXeMDC6NuYASrg09S0HU",
  authDomain: "otp-login-b3fdd.firebaseapp.com",
  projectId: "otp-login-b3fdd",
  storageBucket: "otp-login-b3fdd.appspot.com",
  messagingSenderId: "975050956692",
  appId: "1:975050956692:web:538602fd8bd20049747981"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
// auth.settings.appVerificationDisabledForTesting = false;
// export default auth
// if (process.env.NODE_ENV === 'development') {
// }