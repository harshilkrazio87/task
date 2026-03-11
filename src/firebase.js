import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";  

const firebaseConfig = {
  apiKey: "AIzaSyBNbK81EYAhgomx7tzH3SN_dvXj0Ieq5to",
  authDomain: "task-manager-app-1bde6.firebaseapp.com",
  projectId: "task-manager-app-1bde6",
  storageBucket: "task-manager-app-1bde6.firebasestorage.app",
  messagingSenderId: "754017307857",
  appId: "1:754017307857:web:bcd50927a1a8e564d209f0"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export const auth = getAuth(app);

export default db;