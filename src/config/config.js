import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAgYg19zgMhZ7zCgb5QyFfTgUX4scVtp8c",
    authDomain: "todoapp-react1.firebaseapp.com",
    projectId: "todoapp-react1",
    storageBucket: "todoapp-react1.appspot.com",
    messagingSenderId: "1073815855026",
    appId: "1:1073815855026:web:bde309687073ba1fec4eab",
    measurementId: "G-PRDE7G4QPV"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

