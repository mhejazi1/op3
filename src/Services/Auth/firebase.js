import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyASRnmaHEAvQJRJ8xPDTkEFddCI41BaWQE",
  authDomain: "ownproperties-f3478.firebaseapp.com",
  projectId: "ownproperties-f3478",
  storageBucket: "ownproperties-f3478.appspot.com",
  messagingSenderId: "195016989668",
  appId: "1:195016989668:web:18259c90f259a55e1105f1",
  measurementId: "G-9VRYLHNVFM"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithEmailAndPasswordHandler = ({ email, password }) => {
  return auth.signInWithEmailAndPassword(email, password).catch(error => {
    toast.error("Oopp! Invalid Credentials, Please try again")
    console.error("Error signing in with password and email", error);
  });
};

export const logout = () => auth.signOut();