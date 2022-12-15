import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCnhR7khUmaJYKLI1vQiTv32R51kERHFrk",
  authDomain: "fir-day-projects-abarrotao.firebaseapp.com",
  projectId: "fir-day-projects-abarrotao",
  storageBucket: "fir-day-projects-abarrotao.appspot.com",
  messagingSenderId: "480916208534",
  appId: "1:480916208534:web:abb9f2b18afa48cbd6bbb7",
  measurementId: "G-23LLLF6W2F"
};



const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const dataBase = getFirestore(app);
export const google = new GoogleAuthProvider();

