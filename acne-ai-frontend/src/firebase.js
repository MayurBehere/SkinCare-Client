import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyByaDiZsFYPkWqWYeiWq0GPIRYI3XkOlms",
  authDomain: "skincare-cbf73.firebaseapp.com",
  projectId: "skincare-cbf73",
  storageBucket: "skincare-cbf73.firebasestorage.app",
  messagingSenderId: "460761483990",
  appId: "1:460761483990:web:04c4350731837f7306d777",
  measurementId: "G-8EQVWCCZPS"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };