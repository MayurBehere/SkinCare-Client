import { useState } from "react";
import { Box, Container, Typography, TextField, Button, Alert } from "@mui/material";
import { Link } from "react-router-dom";
import { auth } from "../firebase"; // Import Firebase auth
import { sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

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
    <Container maxWidth="sm">
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Forgot Password
        </Typography>
        {message && <Alert severity="success">{message}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }} onClick={handlePasswordReset}>
          Reset Password
        </Button>
        <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          <Link to="/login" variant="body2">
            {"Remembered your password? Sign In"}
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
 