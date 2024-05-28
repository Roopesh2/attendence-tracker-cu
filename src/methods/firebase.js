// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  initializeFirestore,
  persistentLocalCache,
  persistentSingleTabManager,
} from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQSYxUEcDANv30tnCUlGAgbSrYHrguFbE",
  authDomain: "attendance-tracker-364b5.firebaseapp.com",
  projectId: "attendance-tracker-364b5",
  storageBucket: "attendance-tracker-364b5.appspot.com",
  messagingSenderId: "151155947252",
  appId: "1:151155947252:web:2cc04ee322bfeb1b47d0a1",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
initializeFirestore(FirebaseApp, {
  localCache: persistentLocalCache({
    tabManager: persistentSingleTabManager(),
  }),
});
export const db = getFirestore(FirebaseApp);
