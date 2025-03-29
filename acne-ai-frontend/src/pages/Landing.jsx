// import { AppBar, Toolbar, Button, Container, Typography, Box, Grid } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button"


import Navbar from "../custom/Navbar"

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-8 sm:mx-8 md:mx-16 lg:mx-[16vw]">
      {/* Navbar */}
      {/* <AppBar position="fixed" color="default" elevation={1}>
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
      </AppBar> */}
      <Navbar />
      {/* <div className="flex items-center justify-center">
        <h1 className="absolute bg-white text-4xl p-12 top-60 font-bold">Acne-AI <br />Your AI acne treatment assistant</h1>
        <div className="m-16 w-[60vw] grid grid-cols-12 grid-rows-8 bg-white">
        {Array.from({ length: 84 }, (_, i) => (
          <div
            key={i}
            className="aspect-square bg-white border-[0.5px] border-separate border-black"
          ></div>
        ))}
        </div>
      </div> */}

      {/* <div className="relative flex items-center justify-center mt-16 mx-8">
        <div className="relative">
          <img src={heroImage} alt="herobg" className="object-cover"/>
        </div>
        <div className="absolute inset-0 flex items-center justify-center pb-[10%]">
          <div className="text-left">
            <h1 className="text-[2rem] sm:text-[5rem] md:text-[10rem] font-sfpro font-bold text-black">Acne-AI</h1>
            <h2 className="text-[1rem] sm:text-2xl md:text-3xl font-sfpro md:font-bold sm:font-medium text-black">
            Your AI acne treatment assistant.
          </h2>
          </div>
          
        </div>
      </div> */}
      {/* <div className="h-[40rem] w-full rounded-md flex md:items-center md:justify-center lg:max-h-full md:max-h-full max-h-[30vh] bg-white antialiased bg-grid-white/[0.02] relative overflow-hidden">
        <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
          <h1 className="text-4xl md:text-7xl font-sfpro font-bold text-center bg-clip-text text-black">
            Acne-AI
          </h1>
          <p className="mt-4 font-sfpro text-xl md:text-4xl text-black max-w-lg text-center mx-auto">
            Your AI skincare companion.
          </p>
        </div>
      </div> */}
      <section className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-7xl font-sfpro font-bold text-black">
            Acne-AI
          </h1>
          <p className="mt-2 font-sfpro font-bold text-xl md:text-4xl text-black mx-auto">
          Your AI acne treatment assistant.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-100 rounded-xl p-4">
            g1
          </div>
          <div className="bg-gray-100 rounded-xl p-4">
            g2
          </div>
          <div className="bg-gray-100 rounded-xl p-4">
            g3
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;