import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

/* const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}; */
const firebaseConfig = {
  apiKey: "AIzaSyAvIXWrjnMJilb3T8fI7DteunA4nVDiazs",
  authDomain: "marketplace-6f1ca.firebaseapp.com",
  projectId: "marketplace-6f1ca",
  storageBucket: "marketplace-6f1ca.firebasestorage.app",
  messagingSenderId: "433257991775",
  appId: "1:433257991775:web:6dd9a51c455154d5ff95ea",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
