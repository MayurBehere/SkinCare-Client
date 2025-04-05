import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/Input"
import { ChevronLeft } from "lucide-react"
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import axios from "axios";
import { useState } from "react"
import { auth } from "../firebase"
import { validateEmail } from "../utils/validateEmail"
import { useAuth } from "@/context/AuthContext";

const provider = new GoogleAuthProvider();

const Login = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

    // Function to send token to backend
    const { setCurrentUser } = useAuth();

    const sendTokenToBackend = async (token) => {
      try {
        const response = await axios.post("http://127.0.0.1:5000/api/auth/verify-token", {
          idToken: token,
        }, { withCredentials: true });
    
        console.log("Token sent to backend successfully:", response.data);
        setCurrentUser(response.data.uid); // Update the auth state
        navigate("/main");
      } catch (err) {
        console.error("Error sending token to backend:", err);
        setError(err.response?.data?.error || "Failed to authenticate");
      }
    };

    // NEW LOGIN EMAIL PASSWORD FILE

    // const loginWithEmailPassword = async (email, password) => {
    //   try {
    //     const userCredential = await signInWithEmailAndPassword(auth, email, password);
    //     const user = userCredential.user;
    //     const idToken = await user.getIdToken();
    
    //     // Send token to backend for verification
    //     const response = await axios.post("http://localhost:5000/verify-user", { idToken });
    
    //     // Check if the user's name is empty or undefined
    //     if (!response.data.name || response.data.name.trim() === "") {
    //       navigate("/name-verification");
    //     } else {
    //       navigate("/main");
    //     }
    //   } catch (error) {
    //     console.error("Login Error:", error.response?.data?.message || error.message);
    //     setError(error.response?.data?.message || "Failed to log in");
    //   }
    // };

  const handleEmailPasswordLogin = async (email, password, navigate) => {

    if (!validateEmail(email)) {
      return setError("Enter a valid email")  
    }

    if (!password) {
      return setError("Password is required")
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Get Firebase ID token
      const idToken = await user.getIdToken();
  
      // Send token to backend for verification
      await axios.post("http://localhost:5000/store-user", { idToken });
  
      console.log("User authenticated successfully!");
      navigate("/main"); // Redirect after successful login
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  
  const handleGoogleSignIn = async (navigate) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      // Get Firebase ID token
      const idToken = await user.getIdToken();
  
      // Send token to backend
      const response = await axios.post("http://localhost:5000/store-user", {
        idToken, // Sending Firebase token
      });
  
      if (response.status === 200) {
        console.log("User authenticated successfully");
        navigate("/main");
      }
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleForgotPasswordClick = () => {
    navigate("/forgot-password");
  };

  const handleBackToLandingClick = () => {
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEmailPasswordLogin(email, password, navigate);
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full font-sfproMed px-4">
    <div className="relative flex flex-col items-center bg-gray-100 border rounded-xl px-10 lg:px-24 pt-20 pb-20 w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px]">
      <form className="w-full" onSubmit={handleSubmit}>
        {/* Back Button */}
        <div className="absolute top-4 left-4">
          <Button variant="outline" onClick={handleBackToLandingClick} size="icon">
            <ChevronLeft />
          </Button>
        </div>

        {/* Title */}
        <div className="flex items-center justify-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Sign in
          </h1>
        </div>

        {/* Input Fields */}
        <div className="flex flex-col items-center justify-center w-full max-w-[500px] sm:max-w-[600px] mt-10 gap-5">
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full" />
          <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full" />
        </div>

        {/* Register Button */}
        <div className="mt-6 w-full max-w-[500px] sm:max-w-[600px]">
          <Button type="submit" className="w-full py-3">Sign in</Button>
        </div>

        {/* Google Sign Up Button */}
        <div className="mt-4 w-full max-w-[500px] sm:max-w-[600px]"> 
          <Button variant="outline" onClick={() => handleGoogleSignIn(navigate)} className="w-full flex items-center justify-center gap-3 py-3">
            <FcGoogle /> Sign in with Google
          </Button>
        </div>

        {error && <p className="text-red-500 bg-red-50 py-2 border border-red-200 rounded-md text-center font-medium text-sm mt-4">{error}</p>}

        {/* Forgot Password & Sign In Buttons (Same Width) */}
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
