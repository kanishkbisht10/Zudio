// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDM8AfXMYzcX1Fpk-SB52IELDwRC2D5EFY",
  authDomain: "zudio-db00f.firebaseapp.com",
  databaseURL: "https://zudio-db00f-default-rtdb.firebaseio.com",
  projectId: "zudio-db00f",
  storageBucket: "zudio-db00f.firebasestorage.app",
  messagingSenderId: "296576195920",
  appId: "1:296576195920:web:b534df8682d741c19e2055"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
