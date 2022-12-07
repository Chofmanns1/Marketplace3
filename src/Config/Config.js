import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBIMHepAQvGIcB36RyLZRg691g42Qs6ZGQ",
  authDomain: "marketplace2-d48ee.firebaseapp.com",
  projectId: "marketplace2-d48ee",
  storageBucket: "marketplace2-d48ee.appspot.com",
  messagingSenderId: "780299923126",
  appId: "1:780299923126:web:83a97555693fbd6c424017"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const fs = firebase.firestore();
const storage = firebase.storage();

export { auth, fs, storage }