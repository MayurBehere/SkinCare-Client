import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Replace with your actual auth context

import PropTypes from "prop-types";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth(); // Get the authenticated user from context

  useEffect(() => {
    if (!currentUser) {
      navigate("/login"); // Redirect to login if not authenticated
    }
  }, [currentUser, navigate]);

  return currentUser ? children : null; // Render children if authenticated
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;