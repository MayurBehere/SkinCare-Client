import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";

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
      setMessage("✅ Password reset email sent! Redirecting to login...");
      setTimeout(() => navigate("/login"), 5000); // Redirect after 5 seconds
    } catch (err) {
      console.error("Error sending password reset email:", err);
      setError("❌ Failed to send reset email. Please check your email.");
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

        {/* Message */}
        {message && (
          <p className="text-green-600 bg-green-50 border border-green-200 rounded-md p-2 mt-6 text-sm font-medium text-center w-full max-w-[500px]">
            {message}
          </p>
        )}
        {error && (
          <p className="text-red-500 bg-red-50 border border-red-200 rounded-md p-2 mt-6 text-sm font-medium text-center w-full max-w-[500px]">
            {error}
          </p>
        )}

        {/* Input Field */}
        <form
          onSubmit={handlePasswordReset}
          className="flex flex-col items-center justify-center w-full max-w-[500px] sm:max-w-[600px] mt-10 gap-5"
        >
          <Input
            type="email"
            placeholder="Enter your email"
            className="w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Reset Button */}
          <Button type="submit" className="w-full py-3">
            Reset Password
          </Button>
        </form>

        {/* Navigation */}
        <div className="grid grid-cols-1 sm:flex w-full items-center mt-8 gap-4">
          <Button
            variant="outline"
            onClick={handleBackToLogin}
            className="py-3 w-full"
          >
            Back to login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
