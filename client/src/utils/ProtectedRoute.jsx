import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Check if token exists, if token exists then user will be directed to /add-product page else user would be directed to login page
  const isAuthenticated = !!localStorage.getItem("authToken");

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
