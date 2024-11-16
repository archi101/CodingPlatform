// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDnUTeW0RyOJoLw6BC80ydZr1rChhWF0Dk",
  authDomain: "codeeditor-a8a0e.firebaseapp.com",
  projectId: "codeeditor-a8a0e",
  storageBucket: "codeeditor-a8a0e.firebasestorage.app",
  messagingSenderId: "823190944132",
  appId: "1:823190944132:web:4a0c504b7a9450aaf2c5d1",
  measurementId: "G-EDRR782EZS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);