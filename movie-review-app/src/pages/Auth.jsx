import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import bg from "../assets/authbg.png";

import { signupAPI, getUserByUsernameAPI } from "../services/allAPIs";

const Auth = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleModeChange = (_, newMode) => {
    if (newMode !== null) setMode(newMode);
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  // --- SIGNUP ---
  if (mode === "signup") {

    // 1. Check if username exists
    const existing = await getUserByUsernameAPI(username);

    if (existing?.data?.length > 0) {
      Swal.fire("Username Exists", "Choose a different username", "error");
      setUsername("");
      setPassword("");
      return;
    }

    // 2. Create new user
    const newUser = {
      username,
      password
    };

    const result = await signupAPI(newUser);

    if (result.status >= 200 && result.status < 300) {
      Swal.fire("Signup Successful!", "You can now log in.", "success");
      setMode("login");
      setUsername("");
      setPassword("");
    } else {
      Swal.fire("Error", "Something went wrong!", "error");
    }

    return;
  }

  // --- LOGIN ---
  if (mode === "login") {
    const res = await getUserByUsernameAPI(username);

    const user = res.data?.[0];

    if (!user) {
      Swal.fire("User Not Found", "Please sign up first!", "warning");
      setUsername("");
      setPassword("");
      return;
    }

    if (user.password !== password) {
      Swal.fire("Incorrect Password", "Please try again", "error");
      setPassword("");
      return;
    }

    // SUCCESS
    Swal.fire(`Welcome! ${user.username}`, "You are signed in", "success");
    localStorage.setItem("loggedInUser", user.username);
    navigate("/home");
  }
};


  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
      }}
    >
      {/* your styled card unchanged */}
      <Card
        elevation={8}
        sx={{
          width: { xs: "92%", sm: 420 },
          borderRadius: 4,
          background:
            "linear-gradient(180deg, rgba(169,121,188,0.95), rgba(154,100,164,0.95))",
          border: "4px solid rgba(88,40,80,0.18)",
          boxShadow:
            "0 10px 30px rgba(20, 10, 30, 0.35), inset 0 3px 0 rgba(255,255,255,0.03)",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h4"
            align="center"
            sx={{
              fontWeight: 800,
              letterSpacing: 1,
              color: "rgba(44,14,55,0.95)",
              mb: 2,
            }}
          >
            {mode === "login" ? "LOGIN" : "SIGN UP"}
          </Typography>

          <Box display="flex" justifyContent="center" mb={3}>
            <ToggleButtonGroup
              value={mode}
              exclusive
              onChange={handleModeChange}
              sx={{
                background: "rgba(255,255,255,0.06)",
                borderRadius: 99,
                px: 1,
                "& .MuiToggleButton-root": {
                  textTransform: "none",
                  border: "none",
                  borderRadius: 99,
                  py: 1,
                  px: 3,
                  fontWeight: 600,
                },
                "& .Mui-selected": {
                  background:
                    "linear-gradient(90deg, rgba(76,29,89,1), rgba(82,36,104,1))",
                  color: "#fff",
                },
              }}
            >
              <ToggleButton value="login">Login</ToggleButton>
              <ToggleButton value="signup">Sign Up</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              placeholder="Username"
              variant="filled"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              sx={{
                mb: 2.2,
                "& .MuiFilledInput-root": {
                  backgroundColor: "rgba(255, 237, 247, 0.9)",
                  borderRadius: 2,
                  "&:before, &:after": { display: "none" },
                },
                "& .MuiFilledInput-input::placeholder": {
                  color: "rgba(112, 57, 113, 0.7)",
                  fontWeight: 600,
                },
              }}
              InputProps={{
                disableUnderline: true,
              }}
            />

            <TextField
              fullWidth
              placeholder="Password"
              variant="filled"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{
                mb: 3,
                "& .MuiFilledInput-root": {
                  backgroundColor: "rgba(255, 237, 247, 0.9)",
                  borderRadius: 2,
                  "&:before, &:after": { display: "none" },
                },
                "& .MuiFilledInput-input::placeholder": {
                  color: "rgba(112, 57, 113, 0.7)",
                  fontWeight: 600,
                },
              }}
              InputProps={{
                disableUnderline: true,
              }}
            />

            <Button
              type="submit"
              fullWidth
              sx={{
                height: 56,
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 800,
                fontSize: "1.05rem",
                background:
                  "linear-gradient(90deg, rgba(69,26,88,1), rgba(90,29,100,1))",
                color: "#fff",
                boxShadow: "0 6px 18px rgba(62,15,90,0.45)",
                "&:hover": { filter: "brightness(1.05)" },
              }}
              variant="contained"
            >
              {mode === "login" ? "Login" : "Sign Up"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Auth;
