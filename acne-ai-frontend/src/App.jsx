import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';
import Landing from "./pages/landing.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import ForgotPassword from "./pages/forgot.jsx";
import Main from "./pages/main.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;