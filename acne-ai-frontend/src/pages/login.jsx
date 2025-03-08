import { Box, Container, Typography, TextField, Button, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import axios from "axios"; // Import axios

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
    <Container maxWidth="sm">
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 8 }}>
        <Button variant="text" color="primary" onClick={handleBackToLandingClick} sx={{ alignSelf: "flex-start", mb: 2 }}>
          Back to Landing
        </Button>
        <Typography variant="h4" component="h1" gutterBottom>
          Sign In
        </Typography>
        <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus />
        <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
        <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
          Sign In
        </Button>
        <Button fullWidth variant="outlined" color="primary" sx={{ mt: 1, mb: 2 }} onClick={handleGoogleSignIn}>
          Login with Google
        </Button>
        <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          <Link href="#" variant="body2" onClick={handleForgotPasswordClick}>
            Forgot password?
          </Link>
          <Link href="#" variant="body2" onClick={handleRegisterClick}>
            {"Don't have an account? Register"}
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
