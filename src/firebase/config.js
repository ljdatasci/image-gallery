import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDOMKYSypZPjnslt0tAEs_4kHBe_E4MfgM",
  authDomain: "image-gallery-93486.firebaseapp.com",
  projectId: "image-gallery-93486",
  storageBucket: "image-gallery-93486.appspot.com",
  messagingSenderId: "201867296521",
  appId: "1:201867296521:web:78150c53cf14643de99dd8",
  measurementId: "G-KDXJWNDHDC",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, timestamp };
