import { useState } from "react";
import { Box, Container, Typography, TextField, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase"; // Import Firebase auth
import { createUserWithEmailAndPassword } from "firebase/auth";
import axios from "axios"; // Import Axios for backend request

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

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
    <Container maxWidth="sm">
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Register
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <TextField margin="normal" required fullWidth id="name" label="Name" name="name" autoComplete="name" autoFocus onChange={handleChange} />
        <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" onChange={handleChange} />
        <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="new-password" onChange={handleChange} />
        <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }} onClick={handleRegister}>
          Register
        </Button>
        <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          <Link to="/login" variant="body2">
            {"Already have an account? Sign In"}
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
