import firebase from "firebase";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyAyHV6RRvI8Uf9Ps32qH36c8EwW0ghpTZc",
    authDomain: "snspj-2642f.firebaseapp.com",
    projectId: "snspj-2642f",
    storageBucket: "snspj-2642f.appspot.com",
    messagingSenderId: "827022629386",
    appId: "1:827022629386:web:4b23438948e152c5ffddf3",
    measurementId: "G-YYY0CL356T",
  });
}

export default firebase;
