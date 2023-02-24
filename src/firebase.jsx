import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    // apiKey: "AIzaSyB67v96su7xZG4w5Qh2qYYnHOx7i-h01OQ",
    // authDomain: "userlist-c2682.firebaseapp.com",
    // projectId: "userlist-c2682",
    // storageBucket: "userlist-c2682.appspot.com",
    // messagingSenderId: "36150934367",
    // appId: "1:36150934367:web:b4e1fe39cee9d8316054ea",
    // measurementId: "G-Z4ZHCM8KEH"
    apiKey: "AIzaSyDyS4MomREHcYcodKPJOZPHDiZCKhgxEe0",
    authDomain: "userlist-696f2.firebaseapp.com",
    projectId: "userlist-696f2",
    storageBucket: "userlist-696f2.appspot.com",
    messagingSenderId: "959623059449",
    appId: "1:959623059449:web:fdd3e168a22c14b5488f28",
    measurementId: "G-JT786ZMVSR"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = getStorage(firebaseApp);
const firestore = firebase.firestore();

export { auth, provider, storage, firestore };
export default db;
