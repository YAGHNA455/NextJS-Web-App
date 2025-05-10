import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2hGnFwVZv2olOMNhZkgy_O-O1MAgsMQE",
  authDomain: "nextjs-web-app-fdfcc.firebaseapp.com",
  projectId: "nextjs-web-app-fdfcc",
  storageBucket: "nextjs-web-app-fdfcc.firebasestorage.app",
  messagingSenderId: "260434817199",
  appId: "1:260434817199:web:e3166290edcde121e7e45a",
  measurementId: "G-EPPWZX4YZC"
};

// Initialize Firebase
let app;
let auth;
let db;
let storage;

// Only initialize if we have an API key
if (firebaseConfig.apiKey) {
  try {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
  } catch (error) {
    console.error("Firebase initialization error:", error);
  }
} else {
  console.error("Firebase API key is missing. Check your environment variables.");
}

export { app, auth, db, storage };