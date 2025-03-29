import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios"; // Import axios
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronLeft } from "lucide-react"
import { FcGoogle } from "react-icons/fc";
// import { auth, googleProvider } from "../firebase";
// import { signInWithPopup } from "firebase/auth";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleBackToLogin = () => {
    navigate("/login");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Send user data to Flask backend for storing in MongoDB
      await axios.post("http://localhost:5000/store-user", {
        uid: user.uid,
        email: user.email,
        name: formData.name,
      });

      // Redirect to main page after successful registration
      navigate("/main");
    } catch (err) {
      setError(err.message);
      console.error("Error registering user:", err);
    }
  };

  return (
    // <Container maxWidth="sm">
    //   <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 8 }}>
    //     <Typography variant="h4" component="h1" gutterBottom>
    //       Register
    //     </Typography>
    //     {error && <Typography color="error">{error}</Typography>}
    //     <TextField margin="normal" required fullWidth id="name" label="Name" name="name" autoComplete="name" autoFocus onChange={handleChange} />
    //     <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" onChange={handleChange} />
    //     <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="new-password" onChange={handleChange} />
    //     <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }} onClick={handleRegister}>
    //       Register
    //     </Button>
    //     <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
    //       <Link to="/login" variant="body2">
    //         {"Already have an account? Sign In"}
    //       </Link>
    //     </Box>
    //   </Box>
    // </Container>
  <div className="flex items-center justify-center min-h-screen w-full font-sfproMed px-4">
    <div className="relative flex flex-col items-center bg-gray-100 border rounded-xl px-10 lg:px-24 pt-20 pb-20 w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px]">
      
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
        <Input type="text" placeholder="Name" className="w-full" />
        <Input type="email" placeholder="Email" className="w-full" />
        <Input type="password" placeholder="Password" className="w-full" />
      </div>

      {/* Register Button */}
      <div className="mt-6 w-full max-w-[500px] sm:max-w-[600px]">
        <Button onClick={handleRegister} className="w-full py-3">Register</Button>
      </div>

      {/* Google Sign Up Button */}
      <div className="mt-4 w-full max-w-[500px] sm:max-w-[600px]"> 
        <Button variant="outline" onClick={""} className="w-full flex items-center justify-center gap-3 py-3">
          <FcGoogle /> Sign up with Google
        </Button>
      </div>

      {/* Forgot Password & Sign In Buttons (Same Width) */}
      <div className="grid grid-cols-1 sm:flex w-full items-center mt-8 gap-4">
        <Button variant="outline" onClick={""} className="py-3 w-full">Forgot password?</Button>
        <Button variant="outline" onClick={handleBackToLogin} className="py-3 w-full">Sign in</Button>
      </div>

    </div>
    </div>
  );
};

export default Register;
