import { initializeApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD2hGnFwVZv2olOMNhZkgy_O-O1MAgsMQE",
  authDomain: "nextjs-web-app-fdfcc.firebaseapp.com",
  projectId: "nextjs-web-app-fdfcc",
  storageBucket: "nextjs-web-app-fdfcc.firebasestorage.app",
  messagingSenderId: "260434817199",
  appId: "1:260434817199:web:e3166290edcde121e7e45a",
  measurementId: "G-EPPWZX4YZC"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app) as Auth;
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };