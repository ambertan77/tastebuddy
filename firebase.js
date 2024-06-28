// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
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
  appId: "1:11618353295:web:615992095f7a1f009ab0fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { auth, getAuth, db, getStorage };

