// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-408c1.firebaseapp.com",
  projectId: "real-estate-408c1",
  storageBucket: "real-estate-408c1.appspot.com",
  messagingSenderId: "746955801371",
  appId: "1:746955801371:web:b899bea0e41e59095149be",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
