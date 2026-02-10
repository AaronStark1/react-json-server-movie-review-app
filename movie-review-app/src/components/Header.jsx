import React from "react";
import { AppBar, Toolbar, Typography, Box, Button, IconButton } from "@mui/material";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/auth");
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(90deg, rgba(69,26,88,1), rgba(102,40,120,1))",
        boxShadow: "0 4px 20px rgba(40,0,60,0.4)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* LEFT — Logo + Title */}
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer" }}
          onClick={() => navigate("/home")}
        >
          <MovieCreationIcon sx={{ fontSize: 34 }} />
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              letterSpacing: 1,
            }}
          >
            FrameRate
          </Typography>
        </Box>

        {/* RIGHT — Buttons */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate("/add")}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              fontWeight: 700,
              background:
                "linear-gradient(90deg, rgba(128,58,155,1), rgba(159,74,184,1))",
              "&:hover": {
                filter: "brightness(1.1)",
              },
            }}
          >
            Add Movie
          </Button>

          <Button
            variant="contained"
            onClick={() => navigate("/myreviews")}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              fontWeight: 700,
              background:
                "linear-gradient(90deg, rgba(100,40,130,1), rgba(140,60,170,1))",
              "&:hover": {
                filter: "brightness(1.1)",
              },
            }}
          >
            My Reviews
          </Button>

          <IconButton onClick={handleLogout} sx={{ color: "white" }}>
            <LogoutIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
