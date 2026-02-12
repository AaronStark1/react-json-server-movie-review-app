import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAllMoviesAPI } from "../services/allAPIs";
import MovieCard from "../components/MovieCard";
import Header from "../components/Header";

const Home = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  const [genre, setGenre] = useState("all");
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const logged = localStorage.getItem("loggedInUser");
    if (!logged) navigate("/auth");
    else setUsername(logged);

    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const result = await getAllMoviesAPI();
    if (result.status >= 200 && result.status < 300) {
      setMovies(result.data);
      setFilteredMovies(result.data);
    }
  };

  // Apply filter whenever genre OR movies change
  useEffect(() => {
    if (genre === "all") {
      setFilteredMovies(movies);
    } else {
      setFilteredMovies(movies.filter((m) => m.genre.toLowerCase() === genre));
    }
  }, [genre, movies]);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8e9ff" }}>

      <Header />

      <Box sx={{ p: 4 }}>

        {/* Welcome */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 3,
            color: "rgba(70,20,95,0.9)"
          }}
        >
          Welcome, {username}! 🎬
        </Typography>

        {/*  GENRE FILTER  */}
        <Box
          sx={{
            mb: 4,
            p: 2,
            background: "rgba(255,240,255,0.7)",
            borderRadius: 3,
            boxShadow: "0 6px 16px rgba(80,30,110,0.15)"
          }}
        >
          <FormControl>
            <FormLabel
              sx={{
                fontWeight: "bold",
                color: "rgba(70,20,95,0.9)",
                mb: 1
              }}
            >
              Filter by Genre
            </FormLabel>

            <RadioGroup
              row
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            >
              <FormControlLabel value="all" control={<Radio />} label="All" />
              <FormControlLabel value="action" control={<Radio />} label="Action" />
              <FormControlLabel value="sci-fi" control={<Radio />} label="Sci-Fi" />
              <FormControlLabel value="drama" control={<Radio />} label="Drama" />
              <FormControlLabel value="animation" control={<Radio />} label="Animation" />
              <FormControlLabel value="thriller" control={<Radio />} label="Thriller" />
              <FormControlLabel value="romance" control={<Radio />} label="Romance" />
            </RadioGroup>
          </FormControl>
        </Box>

        {/* MOVIE GRID */}
        <Grid container spacing={3}>
          {filteredMovies.map((movie) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={movie.id}
              sx={{ display: "flex" }}
            >
              <MovieCard
                movie={movie}
                onClick={() => setSelectedMovie(movie)}

              />
            </Grid>
          ))}
        </Grid>

        {/* If no movies match filter */}
        {filteredMovies.length === 0 && (
          <Typography
            align="center"
            sx={{ mt: 4, opacity: 0.6, fontStyle: "italic" }}
          >
            No movies found in this genre.
          </Typography>
        )}
      </Box>
<Dialog
  open={Boolean(selectedMovie)}
  onClose={() => setSelectedMovie(null)}
  maxWidth="sm"
  fullWidth
  PaperProps={{
    sx: {
      borderRadius: 4,
      background:
        "linear-gradient(180deg, rgba(255,240,255,0.95), rgba(240,220,255,0.95))",
      boxShadow: "0 12px 35px rgba(80,30,110,0.3)",
      p: 1,
    },
  }}
>
  {selectedMovie && (
    <>
      <DialogTitle
        sx={{
          fontWeight: 800,
          color: "rgba(70,20,95,0.95)",
          letterSpacing: 0.5,
        }}
      >
        {selectedMovie.title}
      </DialogTitle>

      <DialogContent>

        {/* Poster (Full Visible) */}
        <Box
          component="img"
          src={selectedMovie.poster}
          alt={selectedMovie.title}
          sx={{
            width: "100%",
            borderRadius: 3,
            mb: 2,
            boxShadow: "0 6px 20px rgba(80,30,110,0.25)",
          }}
        />

        <Typography
          variant="body1"
          sx={{
            fontWeight: 600,
            color: "rgba(60,15,80,0.9)",
            mb: 1,
          }}
        >
          Genre: {selectedMovie.genre}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontWeight: 600,
            color: "rgba(60,15,80,0.9)",
            mb: 1,
          }}
        >
          Rating: ⭐ {selectedMovie.rating}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            mt: 2,
            color: "rgba(50,10,70,0.85)",
            lineHeight: 1.6,
          }}
        >
          {selectedMovie.review}
        </Typography>

        <Typography
          variant="caption"
          sx={{
            display: "block",
            mt: 2,
            opacity: 0.7,
            fontStyle: "italic",
            color: "rgba(70,20,95,0.8)",
          }}
        >
          Reviewed by: {selectedMovie.user}
        </Typography>

      </DialogContent>
    </>
  )}
</Dialog>


    </Box>
  );
};

export default Home;
