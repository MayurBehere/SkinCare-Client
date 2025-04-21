import { Routes, Route } from "react-router-dom";
import "./index.css";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ForgotPassword from "./pages/Forgot.jsx";
import Main from "./pages/Main.jsx";
import About from "./pages/About";
import PrivateRoute from "./components/PrivateRoute.jsx";
import SessionPage from "./pages/SessionPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route
        path="/main"
        element={
          <PrivateRoute>
            <Main />
          </PrivateRoute>
        }
      />
      <Route
        path="/session/:sessionId"
        element={
          <PrivateRoute>
            <SessionPage />
          </PrivateRoute>
        }
      />

      <Route path="/about" element={<About />} />
      <Route path="/how-it-works" element={<About />} />
    </Routes>
  );
}

export default App;