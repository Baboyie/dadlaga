import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Alert,
} from "@mui/material";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://192.168.0.110:5000/api/admin/login",
        { username, password }
      );

      localStorage.setItem("authToken", response.data.token);
      alert("Login successful!");
      console.log("Login successful, token stored:", response.data.token);
      window.location.reload();
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Login failed");
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Admin Login
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ marginTop: 3 }}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
