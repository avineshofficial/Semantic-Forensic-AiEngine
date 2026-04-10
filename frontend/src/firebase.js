import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB7qqidJX9rtPBaf-7DrzUXnICLyg30NUM",
  authDomain: "semantic-forensic-engine.firebaseapp.com",
  projectId: "semantic-forensic-engine",
  storageBucket: "semantic-forensic-engine.firebasestorage.app",
  messagingSenderId: "76379752716",
  appId: "1:76379752716:web:9df464c3fa05e4aebaa129"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);