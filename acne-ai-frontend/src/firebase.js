// Import the necessary functions from Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // ✅ Import authentication
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQWvrTtEtpFHzvadIn7fOzh1FdVJ7GU6c",
  authDomain: "skincare-f1dab.firebaseapp.com",
  projectId: "skincare-f1dab",
  storageBucket: "skincare-f1dab.appspot.com", // ✅ Fixed storageBucket URL
  messagingSenderId: "187642976826",
  appId: "1:187642976826:web:7b087f050c6b17e8b37303",
  measurementId: "G-T2D7ZK4BVF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Export Firebase Auth
export const auth = getAuth(app);
export default app;
