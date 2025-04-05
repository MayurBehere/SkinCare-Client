import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ForgotPassword from "./pages/Forgot.jsx";
import Main from "./pages/Main.jsx";
import About from "./pages/About";
import Uploads from "./pages/Uploads";
import Name from "./pages/Name";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/name-verification" element={<Name />} />

        <Route path="/main" element={<Main />} />
        <Route path="/uploads" element={<Uploads />} />

        <Route path="/about" element={<About />} />
        <Route path="/how-it-works" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;