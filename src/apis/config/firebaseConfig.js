// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: "AIzaSyD4lvQK4VC4Umc5TFwKQHn3AumdClzPe9M",
  authDomain: "headers-b2f66.firebaseapp.com",
  projectId: "headers-b2f66",
  storageBucket: "headers-b2f66.firebasestorage.app",
  messagingSenderId: "577659035157",
  appId: "1:577659035157:web:3c5ce24d01b8b197ebf81c",
  measurementId: "G-NXX6DL1ZCJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const storage = getStorage(app);