import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronLeft } from "lucide-react"
import { FcGoogle } from "react-icons/fc";
// import { auth, googleProvider } from "../firebase";
// import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleForgotPasswordClick = () => {
    navigate("/forgot-password");
  };

  const handleBackToLandingClick = () => {
    navigate("/");
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Send UID to Flask backend to store in MongoDB
      const response = await axios.post("http://localhost:5000/store-user", {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
      });

      if (response.status === 201 || response.status === 200) {
        // Only navigate after successful user creation
        navigate("/main");
      } else {
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    }
  };

  return (
    // <Container maxWidth="sm">
    //   <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 8 }}>
    //     <Button variant="text" color="primary" onClick={handleBackToLandingClick} sx={{ alignSelf: "flex-start", mb: 2 }}>
    //       Back to Landing
    //     </Button>
    //     <Typography variant="h4" component="h1" gutterBottom>
    //       Sign In
    //     </Typography>
    //     <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus />
    //     <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
    //     <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
    //       Sign In
    //     </Button>
    //     <Button fullWidth variant="outlined" color="primary" sx={{ mt: 1, mb: 2 }} onClick={handleGoogleSignIn}>
    //       Login with Google
    //     </Button>
    //     <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
    //       <Link href="#" variant="body2" onClick={handleForgotPasswordClick}>
    //         Forgot password?
    //       </Link>
    //       <Link href="#" variant="body2" onClick={handleRegisterClick}>
    //         {"Don't have an account? Register"}
    //       </Link>
    //     </Box>
    //   </Box>
    // </Container>
    <div className="flex items-center justify-center min-h-screen w-full font-sfproMed px-4">
    <div className="relative flex flex-col items-center bg-gray-100 border rounded-xl px-10 lg:px-24 pt-20 pb-20 w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px]">
      
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
        <Input type="email" placeholder="Email" className="w-full" />
        <Input type="password" placeholder="Password" className="w-full" />
      </div>

      {/* Register Button */}
      <div className="mt-6 w-full max-w-[500px] sm:max-w-[600px]">
        <Button onClick={""} className="w-full py-3">Sign in</Button>
      </div>

      {/* Google Sign Up Button */}
      <div className="mt-4 w-full max-w-[500px] sm:max-w-[600px]"> 
        <Button variant="outline" onClick={handleGoogleSignIn} className="w-full flex items-center justify-center gap-3 py-3">
          <FcGoogle /> Sign in with Google
        </Button>
      </div>

      {/* Forgot Password & Sign In Buttons (Same Width) */}
      <div className="grid grid-cols-1 sm:flex w-full items-center mt-8 gap-4">
        <Button variant="outline" onClick={handleForgotPasswordClick} className="py-3 w-full">Forgot password?</Button>
        <Button variant="outline" onClick={handleRegisterClick} className="py-3 w-full">Register</Button>
      </div>

    </div>
    </div>

  );
};

export default Login;
