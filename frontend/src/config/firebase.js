// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtTakCHjKFIWE5aRkolh2GTPUxSOnd8Do",
  authDomain: "twgamestore.firebaseapp.com",
  projectId: "twgamestore",
  storageBucket: "twgamestore.firebasestorage.app",
  messagingSenderId: "364916633006",
  appId: "1:364916633006:web:4c2c34298af9912e53ec3f",
  measurementId: "G-VN5FPEDFBR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);