import { Box, Typography } from "@mui/material";

const ReviewRow = ({ movie, clickable = false, onClick }) => {
  return (
    <Box
      onClick={clickable ? onClick : undefined}
      sx={{
        mb: 3,
        border: "1px solid #ddd",
        borderRadius: "12px",
        p: 3,
        display: "flex",
        gap: 3,
        cursor: clickable ? "pointer" : "default",
        "&:hover": clickable
          ? { backgroundColor: "#faf5ff", transform: "scale(1.01)", transition: "0.2s" }
          : {},
      }}
    >
      {/* Poster */}
      <img
        src={movie.poster}
        alt={movie.title}
        style={{
          width: "140px",
          height: "200px",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />

      {/* Text Section */}
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
          {movie.title}
        </Typography>

        <Typography sx={{ fontSize: "1rem", mb: 0.5 }}>
          <strong>Genre:</strong> {movie.genre}
        </Typography>

        <Typography sx={{ mb: 1 }}>
          <strong>Rating:</strong> ⭐ {movie.rating}
        </Typography>

        <Typography sx={{ opacity: 0.85 }}>
          {movie.review}
        </Typography>
      </Box>
    </Box>
  );
};

export default ReviewRow;
