import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyChrC51d2h_xycz2Ci6Fen_GgRL9wLiEp4",
  authDomain: "pocket-finance-5c3d4.firebaseapp.com",
  projectId: "pocket-finance-5c3d4",
  storageBucket: "pocket-finance-5c3d4.appspot.com",
  messagingSenderId: "1068127451493",
  appId: "1:1068127451493:web:6f5ce2324f9b11c5c6098c",
  measurementId: "G-940C7NLL4M",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
