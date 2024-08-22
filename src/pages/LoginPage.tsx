import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Avatar,
  InputAdornment,
  IconButton,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (username === "" || password === "") {
      setError("Please enter both username and password.");
    } else {
      setError("");
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#19181f",
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 500,
          padding: 3,
          backgroundColor: "#19181f",
          border: "none",
          boxShadow: "none",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              m: 1,
              bgcolor: "#19181f",
              width: 50,
              height: 50,
              border: "2px solid #f0803c",
            }}
          >
            <LockOutlinedIcon sx={{ color: "#f0803c", fontSize: 32 }} />
          </Avatar>
          <Typography
            variant="h5"
            component="div"
            gutterBottom
            style={{
              color: "#ffffff",
              textAlign: "center",
              marginBottom: "16px",
            }}
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
                  borderColor: "#888888",
                },
                "&:hover fieldset": {
                  borderColor: "#f0803c",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#f0803c",
                },
                backgroundColor: "#2c2c34",
                color: "#ffffff",
                "& input:-webkit-autofill": {
                  WebkitBoxShadow: "0 0 0 100px #2c2c34 inset",
                  WebkitTextFillColor: "#ffffff",
                  borderColor: "#f0803c",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#888888",
              },
            }}
            InputLabelProps={{
              style: { color: "#888888" },
            }}
          />
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            margin="normal"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#888888",
                },
                "&:hover fieldset": {
                  borderColor: "#f0803c",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#f0803c",
                },
                backgroundColor: "#2c2c34",
                color: "#ffffff",
              },
              "& .MuiInputLabel-root": {
                color: "#888888",
              },
            }}
            InputLabelProps={{
              style: { color: "#888888" },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    sx={{ color: "#f0803c" }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
            sx={{
              marginTop: 2,
              backgroundColor: "#f0803c",
              color: "#ffffff",

              height: "48px",
              fontSize: "16px",
            }}
          >
            Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
