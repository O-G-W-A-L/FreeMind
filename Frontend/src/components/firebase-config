// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAb-xh3FxHfvv12k03054GAD3Nrb1UFZeY",
  authDomain: "freemind-2dd3d.firebaseapp.com",
  projectId: "freemind-2dd3d",
  storageBucket: "freemind-2dd3d.appspot.com",
  messagingSenderId: "794847206152",
  appId: "1:794847206152:web:6b03ed18c21bd681b3aabd",
  measurementId: "G-P0BS4TKPY6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();