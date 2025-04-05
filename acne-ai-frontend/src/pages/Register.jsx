import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios"; // Import axios
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/Input"
import { ChevronLeft, Eye } from "lucide-react"
import { FcGoogle } from "react-icons/fc";
import { auth } from "../firebase"
import { validateEmail } from "../utils/validateEmail"
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";

const provider = new GoogleAuthProvider();

const Register = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const registerWithEmailPassword = async (email, password, name, navigate) => {

    if (!name) {
      return setError("Enter a valid Name")
    }

    if (!validateEmail(email)) {
      return setError("Enter a valid email")
    }
    setError("")

    if (!password) {
      return setError("Password is required")
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Get Firebase ID token
      const idToken = await user.getIdToken();
  
      // Send user data to backend
      await axios.post("http://localhost:5000/store-user", { idToken, name });
  
      navigate("/main");
    } catch (error) {
      console.error(error.message);
    }
  };

  const registerWithGoogle = async (navigate) => {
  
    try {
      provider.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken();
  
      await axios.post("http://localhost:5000/store-user", { idToken });
  
      navigate("/main");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      setError(error.message);
    }
  };

  const handleForgotPasswordClick = () => {
    navigate("/forgot-password");
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerWithEmailPassword(email, password, name);
  };

  return (
  <div className="flex items-center justify-center min-h-screen w-full font-sfproMed px-4">
    <div className="relative flex flex-col items-center bg-gray-100 border rounded-xl px-10 lg:px-24 pt-20 pb-20 w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px]">
      <form className="w-full" onSubmit={handleSubmit}>
        {/* Back Button */}
        <div className="absolute top-4 left-4">
          <Button variant="outline" onClick={handleBackToLogin} size="icon">
            <ChevronLeft />
          </Button>
        </div>

        {/* Title */}
        <div className="flex items-center justify-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Register
          </h1>
        </div>

        {/* Input Fields */}
        <div className="flex flex-col items-center justify-center w-full max-w-[500px] sm:max-w-[600px] mt-10 gap-5">
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full" />
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full" />
        </div>

        {/* Register Button */}
        <div className="mt-6 w-full max-w-[500px] sm:max-w-[600px]">
          <Button type="submit" className="w-full py-3">Register</Button>
        </div>

        {/* Google Sign Up Button */}
        <div className="mt-4 w-full max-w-[500px] sm:max-w-[600px]"> 
          <Button variant="outline" onClick={() => registerWithGoogle(navigate)} className="w-full flex items-center justify-center gap-3 py-3">
            <FcGoogle /> Sign up with Google
          </Button>
        </div>

        {error && <p className="text-red-500 bg-red-50 py-2 border border-red-200 rounded-md text-center font-medium text-sm mt-4">{error}</p>}

        {/* Forgot Password & Sign In Buttons (Same Width) */}
        <div className="grid grid-cols-1 sm:flex w-full items-center mt-8 gap-4">
          <Button variant="outline" onClick={handleForgotPasswordClick} className="py-3 w-full">Forgot password?</Button>
          <Button variant="outline" onClick={handleBackToLogin} className="py-3 w-full">Sign in</Button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Register;
