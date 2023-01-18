import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCNcuXMs3WcrRL4A9v27HLnelbxINmLW-w",
  authDomain: "academia-tracker.firebaseapp.com",
  projectId: "academia-tracker",
  storageBucket: "academia-tracker.appspot.com",
  messagingSenderId: "970053804751",
  appId: "1:970053804751:web:40a72370854abda938cdba",
};

firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

export { projectFirestore, projectAuth, projectStorage };
