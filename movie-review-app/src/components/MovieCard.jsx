import React from "react";
import { Card, CardMedia, CardContent, Typography, Rating } from "@mui/material";

const MovieCard = ({ movie, onClick }) => {
  return (
    <Card
      onClick={onClick}
      sx={{
        width: 240,           // ⭐ FIXED WIDTH
        height: 430,          // ⭐ FIXED HEIGHT (poster + text)
        borderRadius: 3,
        cursor: onClick ? "pointer" : "default",
        background: "linear-gradient(180deg, rgba(255,240,255,0.9), rgba(240,220,255,0.9))",
        boxShadow: "0 8px 25px rgba(80,30,110,0.2)",
        transition: "0.2s",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: "0 10px 35px rgba(80,30,110,0.35)",
        },
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ⭐ FIXED POSTER HEIGHT */}
      <CardMedia
        component="img"
        image={movie.poster}
        alt={movie.title}
        sx={{
          width: "100%",
          height: 320,
          objectFit: "cover",
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "rgba(50,10,70,0.9)",
            mb: 1,
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {movie.title}
        </Typography>

        <Rating
          value={Number(movie.rating)}
          precision={0.5}
          readOnly
          sx={{ color: "#7a2ea8" }}
        />
      </CardContent>
    </Card>
  );
};

export default MovieCard;
