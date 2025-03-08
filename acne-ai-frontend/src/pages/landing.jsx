import { AppBar, Toolbar, Button, Container, Typography, Box, Grid } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

const HeroContainer = styled("div")({
  paddingTop: "80px",
  paddingBottom: "80px",
  textAlign: "center",
});

const Landing = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <Box>
      {/* Navbar */}
      <AppBar position="fixed" color="default" elevation={1}>
        <Container>
          <Toolbar style={{ justifyContent: "space-between" }}>
            <img src="/logo.png" alt="Logo" style={{ height: 32 }} />
            <Box style={{ display: "flex", gap: "24px" }}>
              {['Home', 'About', 'How It Works', 'Contact'].map((item) => (
                <Button key={item} color="inherit">{item}</Button>
              ))}
              <Button variant="contained" color="primary" onClick={handleGetStarted}>Get Started</Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
              
      {/* Hero Section */}
      <HeroContainer>
        <Container>
          <Grid container spacing={5} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
                Smart Acne Detection & Personalized Remedies
              </Typography>
              <Typography variant="h6" color="text.secondary" paragraph>
                Upload a selfie, get instant acne analysis, and expert-recommended treatments tailored just for you.
              </Typography>
              <Button variant="contained" color="primary" size="large" onClick={handleGetStarted}>
                Get Started
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <img src="/hero-image.png" alt="AI Acne Detection" style={{ width: "100%", objectFit: "cover" }} />
            </Grid>
          </Grid>
        </Container>
      </HeroContainer>

      {/* Footer */}
      <Box component="footer" style={{ backgroundColor: "#1f2937", color: "gray", padding: "24px", textAlign: "center" }}>
        <Typography variant="body2">&copy; {new Date().getFullYear()} AI Acne Detection. All rights reserved.</Typography>
      </Box>
    </Box>
  );
};

export default Landing;