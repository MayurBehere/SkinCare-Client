import { Box, Container, Typography, TextField, Button, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
        }}
      >
        <Button
          variant="text"
          color="primary"
          onClick={handleBackToLandingClick}
          sx={{ alignSelf: 'flex-start', mb: 2 }}
        >
          Back to Landing
        </Button>
        <Typography variant="h4" component="h1" gutterBottom>
          Sign In
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
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