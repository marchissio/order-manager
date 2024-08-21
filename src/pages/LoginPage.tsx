// src/LoginPage.tsx
import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    // Handle login logic
    if (username === "" || password === "") {
      setError("Please enter both username and password.");
    } else {
      setError("");
      // Proceed with login logic
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 500, // Increased width for the card
          padding: 3,
          backgroundColor: "#19181f",
          border: "2px solid #ffffff",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#f0803c" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            variant="h5"
            component="div"
            gutterBottom
            style={{ color: "#f0803c" }}
          >
            Login
          </Typography>
          {error && (
            <Typography variant="body2" color="error" gutterBottom>
              {error}
            </Typography>
          )}
          <TextField
            fullWidth
            label="Username"
            margin="normal"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#cccccc",
                },
                "&:hover fieldset": {
                  borderColor: "#f0803c",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#f0803c",
                },
                backgroundColor: "#2c2c34",
              },
              "& .MuiInputLabel-root": {
                color: "#cccccc",
              },
            }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#cccccc",
                },
                "&:hover fieldset": {
                  borderColor: "#f0803c",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#f0803c",
                },
                backgroundColor: "#2c2c34",
              },
              "& .MuiInputLabel-root": {
                color: "#cccccc",
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
            sx={{ marginTop: 2 }}
          >
            Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
