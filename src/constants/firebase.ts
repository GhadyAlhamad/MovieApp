import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyA6qfhNOg54A8Evfe0G2PeRS2h4f81Pt3k",
  authDomain: "oppa-coding-challenge.firebaseapp.com",
  databaseURL: "https://oppa-coding-challenge.firebaseio.com",
  projectId: "oppa-coding-challenge",
  storageBucket: "oppa-coding-challenge.appspot.com",
  messagingSenderId: "246738910516",
  appId: "1:246738910516:web:155d7bef48ef1f1132f961",
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = getFirestore(app);
export default firebaseConfig;
