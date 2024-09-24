import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDkkCrcScWWHxkdPzSMosw6B6PA2Pu3gss",
    authDomain: "skilllinkwebapp.firebaseapp.com",
    projectId: "skilllinkwebapp",
    storageBucket: "skilllinkwebapp.appspot.com",
    messagingSenderId: "80797477010",
    appId: "1:80797477010:web:85adb24733631ea1015e4b"
  };
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export Firebase services
export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();