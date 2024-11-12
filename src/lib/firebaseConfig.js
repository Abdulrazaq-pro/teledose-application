// src/lib/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCe89zb4jMCXAho12vmXCWbvBgLRl8gSRU",
  authDomain: "teledose-705e1.firebaseapp.com",
  projectId: "teledose-705e1",
  storageBucket: "teledose-705e1.appspot.com",
  messagingSenderId: "558500041966",
  appId: "1:558500041966:web:160228a50e729d93e18fff",
  measurementId: "G-PW7TNCNVNK",
};

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Initialize and export Firebase services
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export { firebaseApp };
