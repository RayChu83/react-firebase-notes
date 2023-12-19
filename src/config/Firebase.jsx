import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB7qNILSGQDG9a1SDqsvCGjNdGwYrzXvlk",
  authDomain: "notes-learn-firebase.firebaseapp.com",
  projectId: "notes-learn-firebase",
  storageBucket: "notes-learn-firebase.appspot.com",
  messagingSenderId: "329407595767",
  appId: "1:329407595767:web:480ef30cf604d40da7fff2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);