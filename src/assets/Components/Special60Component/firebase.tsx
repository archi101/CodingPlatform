// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "",
  authDomain: "codeeditor-a8a0e.firebaseapp.com",
  projectId: "codeeditor-a8a0e",
  storageBucket: "codeeditor-a8a0e.firebasestorage.app",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
