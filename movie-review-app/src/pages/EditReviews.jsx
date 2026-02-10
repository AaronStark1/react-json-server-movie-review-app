import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Rating,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleMovieAPI, updateMovieAPI,deleteMovieAPI } from "../services/allAPIs";
import Header from "../components/Header";

const EditReview = () => {
  const { id } = useParams(); // movie ID from URL
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch movie on load
  useEffect(() => {
    fetchMovie();
  }, []);

  const fetchMovie = async () => {
    const res = await getSingleMovieAPI(id);

    if (res.status >= 200 && res.status < 300) {
      setMovie(res.data);
      setLoading(false);
    } else {
      alert("Failed to load movie");
      navigate("/myreviews");
    }
  };

  // Update Movie Handler
  const handleUpdate = async () => {
    if (!movie.title || !movie.genre || !movie.poster) {
      alert("All fields except review are required!");
      return;
    }

    const res = await updateMovieAPI(id, movie);

    if (res.status >= 200 && res.status < 300) {
      alert("Review updated successfully!");
      navigate("/myreviews");
    } else {
      alert("Failed to update review");
    }
  };

  if (loading || !movie) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress sx={{ color: "#7a2ea8" }} />
      </Box>
    );
  }

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this review?");
    if (!confirmDelete) return;

    const res = await deleteMovieAPI(id);

    if (res.status >= 200 && res.status < 300) {
      alert("Review deleted successfully!");
      navigate("/myreviews");
    } else {
      alert("Failed to delete review");
    }
  };

  return (
    <>
      <Header />
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#f8e9ff",
          p: 4,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            mb: 3,
            color: "rgba(70,20,95,0.9)",
          }}
        >
          Edit Review 🎞️
        </Typography>

        <Box
          sx={{
            maxWidth: 600,
            mx: "auto",
            p: 4,
            borderRadius: 4,
            background:
              "linear-gradient(180deg, rgba(255,240,255,0.9), rgba(240,220,255,0.9))",
            boxShadow: "0 8px 25px rgba(80,30,110,0.25)",
          }}
        >
          {/* Title */}
          <TextField
            fullWidth
            label="Movie Title"
            value={movie.title}
            onChange={(e) => setMovie({ ...movie, title: e.target.value })}
            sx={{ mb: 3 }}
          />

          {/* Genre */}
          <TextField
            fullWidth
            label="Genre"
            value={movie.genre}
            onChange={(e) => setMovie({ ...movie, genre: e.target.value })}
            sx={{ mb: 3 }}
          />

          {/* Poster */}
          <TextField
            fullWidth
            label="Poster URL"
            value={movie.poster}
            onChange={(e) => setMovie({ ...movie, poster: e.target.value })}
            sx={{ mb: 3 }}
          />

          {/* Rating */}
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ fontWeight: 600, mb: 1 }}>Rating</Typography>
            <Rating
              value={Number(movie.rating)}
              onChange={(e, value) => setMovie({ ...movie, rating: value })}
              sx={{ color: "#7a2ea8" }}
            />
          </Box>

          {/* Review */}
          <TextField
            fullWidth
            label="Review"
            multiline
            minRows={4}
            value={movie.review}
            onChange={(e) => setMovie({ ...movie, review: e.target.value })}
            sx={{ mb: 3 }}
          />

          {/* Save Button */}
          <Button
            fullWidth
            variant="contained"
            sx={{
              height: 50,
              borderRadius: 3,
              fontWeight: 800,
              background:
                "linear-gradient(90deg, rgba(69,26,88,1), rgba(120,52,140,1))",
              "&:hover": {
                filter: "brightness(1.05)",
              },
            }}
            onClick={handleUpdate}
          >
            Save Changes
          </Button>

          <Button
            fullWidth
            variant="outlined"
            color="error"
            sx={{
              height: 50,
              borderRadius: 3,
              fontWeight: 700,
              mt: 2,
              borderColor: "#aa2e2e",
              color: "#aa2e2e",
              "&:hover": {
                backgroundColor: "#aa2e2e",
                borderColor: "#ff0000",
                color:"white"
              },
            }}
            onClick={handleDelete}
          >
            Delete Review
          </Button>

        </Box>
      </Box>
    </>
  );
};

export default EditReview;
