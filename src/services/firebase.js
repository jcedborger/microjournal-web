// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { atom } from "nanostores";

export const token = atom(null);

const firebaseConfig = {
  apiKey: "AIzaSyClbqlTAi6ZLPlGO2BodsddfqlfJb7mGTM",
  authDomain: "microjournal-fb.firebaseapp.com",
  projectId: "microjournal-fb",
  storageBucket: "microjournal-fb.firebasestorage.app",
  messagingSenderId: "176160053745",
  appId: "1:176160053745:web:ca2c210455de0e87854c50",
  measurementId: "G-4D1YLZ3H0M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

auth.onAuthStateChanged((user) => {
  if (user) {
    token.set(user.accessToken);
    console.log("User is signed in:", user.email);
  } else {
    console.log("No user is signed in.");
  }
});

export const signIn = async ({ email, password }) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );
  return userCredential.user;
};

export const signUp = async ({ email, password }) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  return userCredential.user;
};
