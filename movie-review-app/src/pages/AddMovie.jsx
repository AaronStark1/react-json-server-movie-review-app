import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Rating,
  MenuItem,
} from "@mui/material";
import { addMovieAPI } from "../services/allAPIs";
import bg from "../assets/authbg.png"; // same purple themed background
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const genres = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Fantasy",
  "Sci-Fi",
  "Romance",
  "Thriller",
];

const AddMovie = () => {
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem("loggedInUser");

  const [movieData, setMovieData] = useState({
    title: "",
    genre: "",
    rating: 0,
    review: "",
    poster: "",
    user: loggedInUser,
  });

  const handleChange = (e) => {
    setMovieData({ ...movieData, [e.target.name]: e.target.value });
  };

  const handleAddMovie = async (e) => {
    e.preventDefault();

    if (!loggedInUser) {
      alert("Please login first!");
      navigate("/auth");
      return;
    }

    // Validation
    if (!movieData.title || !movieData.genre || !movieData.review) {
      setAlert({ type: "warning", text: "Please fill all required fields." });
      return;
    }

    const response = await addMovieAPI(movieData);

    if (response.status >= 200 && response.status < 300) {
      alert("Movie added successfully!");
      navigate("/home");
    } else {
      alert("Something went wrong!");
    }
  };

  return (
    <>
    <Header/>
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        p: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <Card
        sx={{
          width: { xs: "92%", sm: "550px" },
          borderRadius: 4,
          mt: 5,
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
              mb: 3,
              color: "rgba(44,14,55,0.95)",
            }}
          >
            Add a Movie 🎬
          </Typography>

          <form onSubmit={handleAddMovie}>
            {/* Title */}
            <TextField
              fullWidth
              placeholder="Movie Title"
              name="title"
              value={movieData.title}
              onChange={handleChange}
              variant="filled"
              required
              sx={inputStyle}
            />

            {/* Genre */}
            <TextField
              select
              fullWidth
              placeholder="Genre"
              name="genre"
              value={movieData.genre}
              onChange={handleChange}
              variant="filled"
              required
              sx={inputStyle}
            >
              {genres.map((g) => (
                <MenuItem key={g} value={g}>
                  {g}
                </MenuItem>
              ))}
            </TextField>

            {/* Poster URL */}
            <TextField
              fullWidth
              placeholder="Poster Image URL"
              name="poster"
              value={movieData.poster}
              onChange={handleChange}
              variant="filled"
              sx={inputStyle}
            />

            {/* Rating */}
            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{ mb: 1, fontWeight: 600, color: "rgba(44, 14, 55, 0.95)" }}
              >
                Rating
              </Typography>
              <Rating
                name="rating"
                value={movieData.rating}
                onChange={(e, newValue) =>
                  setMovieData({ ...movieData, rating: newValue })
                }
                size="large"
              />
            </Box>

            {/* Review */}
            <TextField
              fullWidth
              placeholder="Write a short review..."
              name="review"
              multiline
              rows={4}
              value={movieData.review}
              onChange={handleChange}
              variant="filled"
              required
              sx={inputStyle}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              sx={{
                mt: 2,
                height: 56,
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 800,
                fontSize: "1rem",
                background:
                  "linear-gradient(90deg, rgba(69,26,88,1), rgba(90,29,100,1))",
                color: "#fff",
                boxShadow: "0 6px 18px rgba(62,15,90,0.45)",
                "&:hover": {
                  filter: "brightness(1.05)",
                },
              }}
            >
              Add Movie
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
    </>
  );
};

const inputStyle = {
  mb: 2.2,
  "& .MuiFilledInput-root": {
    backgroundColor: "rgba(255, 237, 247, 0.9)",
    borderRadius: 2,
    "&:before, &:after": { display: "none" },
  },
  "& .MuiFilledInput-input": {
    padding: "14px 14px",
    fontWeight: 600,
    color: "rgba(34,10,45,0.9)",
  },
  "& .MuiFilledInput-input::placeholder": {
    color: "rgba(112, 57, 113, 0.7)",
    fontWeight: 600,
  },
};

export default AddMovie;
