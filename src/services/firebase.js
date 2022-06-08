import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import config from "../config/config";

const firebaseConfig = {
  apiKey: config.REACT_APP_FIREBASE_API_KEY,
  authDomain: config.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: config.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: config.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: config.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: config.REACT_APP_FIREBASE_APP_ID,
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  return auth.signInWithPopup(provider);
};

export const signOut = () => auth.signOut();
