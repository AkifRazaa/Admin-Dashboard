import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Box, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      navigate("/add-product");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(""); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.success === true) {
        // Store token or any required data in localStorage or context
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("userId", response.data.userId);

        console.log(response.data.userId)

        navigate("/add-product");
      }
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 30 }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Login
        </Button>
      </form>
    </Box>
  );
};

export default Login;
