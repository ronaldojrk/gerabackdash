// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuUMA5lbs7lLOZT8vHX-IjIAs8MM1Bt1o",
  authDomain: "geraback-6d18b.firebaseapp.com",
  projectId: "geraback-6d18b",
  storageBucket: "geraback-6d18b.appspot.com",
  messagingSenderId: "481234223226",
  appId: "1:481234223226:web:fe43e9431e04de31417bc3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);