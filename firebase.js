// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';
import { initializeAuth, getReactNativePersistence, experimentalForceLongPolling } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAgj7P6UvyiCPfGRsMDkR7lJZ78fDXgJ4",
  authDomain: "tastebuddy-d73f8.firebaseapp.com",
  projectId: "tastebuddy-d73f8",
  storageBucket: "tastebuddy-d73f8.appspot.com",
  messagingSenderId: "11618353295",
  appId: "1:11618353295:web:615992095f7a1f009ab0fa",
  databaseURL: "https://tastebuddy-d73f8-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp()
}

let auth;
try {
  auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
} catch (error) {
  auth = getAuth(app);
}

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const db2 = getDatabase(app);

export { auth, getAuth, db, db2, getStorage };