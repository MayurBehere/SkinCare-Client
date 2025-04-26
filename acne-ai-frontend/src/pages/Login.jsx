import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { ChevronLeft } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import axios from "axios";
import { useState } from "react";
import { auth } from "../firebase";
import { validateEmail } from "../utils/validateEmail";
import { useAuth } from "@/context/AuthContext";

const provider = new GoogleAuthProvider();

const Login = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useAuth();

  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Send token to backend
  const sendTokenToBackend = async (token) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/auth/verify-token",
        { idToken: token },
        { withCredentials: true }
      );

      console.log("✅ Backend response:", response.data);
      setCurrentUser(response.data.uid);
      navigate("/main");
    } catch (err) {
      console.error("❌ Error sending token to backend:", err);
      setError(err.response?.data?.error || "Failed to authenticate");
    }
  };

  // Email/Password login handler
  const handleEmailPasswordLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) return setError("Enter a valid email");
    if (!password) return setError("Password is required");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      await sendTokenToBackend(token);
    } catch (error) {
      console.error("Login Error:", error);
      setError("Invalid email or password");
    }
  };

  // Google login handler
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      await sendTokenToBackend(token);
    } catch (error) {
      console.error("Google login failed:", error);
      setError("Google login failed");
    }
  };

  const handleRegisterClick = () => navigate("/register");
  const handleForgotPasswordClick = () => navigate("/forgot-password");
  const handleBackToLandingClick = () => navigate("/");

  return (
    <div className="flex items-center justify-center min-h-screen w-full font-sfproMed px-4">
      <div className="relative flex flex-col items-center bg-gray-100 border rounded-xl px-10 lg:px-24 pt-20 pb-20 w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px]">
        <form className="w-full" onSubmit={handleEmailPasswordLogin}>
          {/* Back Button */}
          <div className="absolute top-4 left-4">
            <Button variant="outline" onClick={handleBackToLandingClick} size="icon">
              <ChevronLeft />
            </Button>
          </div>

          {/* Title */}
          <div className="flex items-center justify-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">Sign in</h1>
          </div>

          {/* Input Fields */}
          <div className="flex flex-col items-center justify-center w-full max-w-[500px] sm:max-w-[600px] mt-10 gap-5">
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full" />
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full" />
          </div>

          {/* Sign In Button */}
          <div className="mt-6 w-full max-w-[500px] sm:max-w-[600px]">
            <Button type="submit" className="w-full py-3">Sign in</Button>
          </div>

          {/* Google Sign In Button */}
          <div className="mt-4 w-full max-w-[500px] sm:max-w-[600px]"> 
            <Button variant="outline" onClick={handleGoogleSignIn} className="w-full flex items-center justify-center gap-3 py-3">
              <FcGoogle /> Sign in with Google
            </Button>
          </div>

          {error && !error.toLowerCase().includes('firebase') && (
  <p className="text-red-500 bg-red-50 py-2 border border-red-200 rounded-md text-center font-medium text-sm mt-4">
    {error}
  </p>
)}

          {/* Forgot Password & Register */}
          <div className="grid grid-cols-1 sm:flex w-full items-center mt-8 gap-4">
            <Button variant="outline" onClick={handleForgotPasswordClick} className="py-3 w-full">Forgot password?</Button>
            <Button variant="outline" onClick={handleRegisterClick} className="py-3 w-full">Register</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
