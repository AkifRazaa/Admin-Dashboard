import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("authToken"); // Check if token exists

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
