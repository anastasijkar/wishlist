import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

let config = {
  apiKey: "AIzaSyDVpzLcaG3wS2jdv9ql_a14PES2G5suPa4",
  authDomain: "wishlist-e1d8a.firebaseapp.com",
  projectId: "wishlist-e1d8a",
  storageBucket: "wishlist-e1d8a.appspot.com",
  messagingSenderId: "852422904417",
  appId: "1:852422904417:web:aadcb94d60ad2466db7820"
};

firebase.initializeApp(config);

export const db = firebase.firestore(firebase.apps[0]);

export default firebase;