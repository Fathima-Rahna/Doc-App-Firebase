// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhm2Bd8atGAXXAmoONVMpAkbNuCMy1hpg",
  authDomain: "mydoc-b42cd.firebaseapp.com",
  projectId: "mydoc-b42cd",
  storageBucket: "mydoc-b42cd.appspot.com",
  messagingSenderId: "226706785264",
  appId: "1:226706785264:web:20c9adffc963ed04f25335",
  measurementId: "G-ZWLQVBSXKF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const firestore = getFirestore(app);