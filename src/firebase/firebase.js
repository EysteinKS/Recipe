import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyBxvkX2rhTmkjyACEU2ldkGgl1OhVQAG0g",
    authDomain: "oppskrift-83f97.firebaseapp.com",
    databaseURL: "https://oppskrift-83f97.firebaseio.com",
    projectId: "oppskrift-83f97",
    storageBucket: "oppskrift-83f97.appspot.com",
    messagingSenderId: "589311419749"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
  
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

export {
  auth,
  firestore,
  storage
}