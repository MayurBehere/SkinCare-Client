import { Box, Container, Typography, TextField, Button } from '@mui/material';
import { Link} from 'react-router-dom';

const ForgotPassword = () => {

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
        <Typography variant="h4" component="h1" gutterBottom>
          Forgot Password
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
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
        >
          Reset Password
        </Button>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Link to="/login" variant="body2">
            {"Remembered your password? Sign In"}
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default ForgotPassword;