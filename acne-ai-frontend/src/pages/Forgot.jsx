import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios"; // Import axios
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/Input"
// import { auth, googleProvider } from "../firebase";
// import { signInWithPopup } from "firebase/auth";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleBackToLogin = () => {
    navigate("/login");
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Check your inbox.");
    } catch (err) {
      setError("Failed to send reset email. Please check your email address.");
      console.error("Error sending password reset email:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full font-sfproMed px-4">
    <div className="relative flex flex-col items-center bg-gray-100 border rounded-xl px-10 lg:px-24 pt-20 pb-10 w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px]">

      {/* Title */}
      <div className="flex items-center justify-center">
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
          Forgot password?
        </h1>
      </div>

      {/* Input Fields */}
      <div className="flex flex-col items-center justify-center w-full max-w-[500px] sm:max-w-[600px] mt-10 gap-5">
        <Input type="email" placeholder="Email" className="w-full" />
      </div>

      {/* Register Button */}
      <div className="mt-6 w-full max-w-[500px] sm:max-w-[600px]">
        <Button onClick={handlePasswordReset} className="w-full py-3">Reset password</Button>
      </div>

      {/* Forgot Password & Sign In Buttons (Same Width) */}
      <div className="grid grid-cols-1 sm:flex w-full items-center mt-8 gap-4">
        <Button variant="link" onClick={handleBackToLogin} className="py-3 w-full">Back to login</Button>
      </div>

    </div>
    </div>

  );
};

export default ForgotPassword;
 