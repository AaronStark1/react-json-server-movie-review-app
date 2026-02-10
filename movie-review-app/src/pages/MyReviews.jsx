import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Typography,
  Button
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getMoviesByUserAPI } from "../services/allAPIs";
import Header from "../components/Header";
import ReviewRow from "../components/ReviewRow";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const MyReviews = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const username = localStorage.getItem("loggedInUser");

  const pdfRef = useRef();

  useEffect(() => {
    if (!username) {
      navigate("/auth");
    } else {
      fetchMovies();
    }
  }, []);

  const fetchMovies = async () => {
    const response = await getMoviesByUserAPI(username);
    if (response.status >= 200 && response.status < 300) {
      setMovies(response.data);
    }
  };

const exportPDF = async () => {
  const element = pdfRef.current;

  // Take canvas snapshot
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
  });

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  const imgWidth = pdfWidth;
  
  // Calculate height proportional to canvas
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 0;

  // First page
  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  heightLeft -= pdfHeight;

  // Add extra pages if needed
  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;
  }

  pdf.save(`${username}_reviews.pdf`);
};

  return (
    <>
      <Header />

      <Box sx={{ p: 4, minHeight: "100vh", bgcolor: "#f8e9ff" }}>
        
        {/* Top Bar */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: "rgba(70,20,95,0.9)" }}>
            My Reviews 🎞️
          </Typography>

          <Button
            variant="contained"
            startIcon={<PictureAsPdfIcon />}
            onClick={exportPDF}
            sx={{
              textTransform: "none",
              fontWeight: 700,
              borderRadius: 2,
              background:
                "linear-gradient(90deg, rgba(100,40,130,1), rgba(150,70,175,1))",
            }}
          >
            Export as PDF
          </Button>
        </Box>

        {/* Visible List */}
        {movies.map((movie) => (
          <ReviewRow
            key={movie.id}
            movie={movie}
            clickable={true}
            onClick={() => navigate(`/edit/${movie.id}`)}
          />
        ))}
      </Box>

      {/* ---------- Hidden clone for PDF ---------- */}
      <Box
        ref={pdfRef}
        sx={{
          position: "absolute",
          top: -9999,
          left: -9999,
          width: "800px",
          bgcolor: "white",
          p: 4,
        }}
      >
        <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
          {username}'s Movie Reviews
        </Typography>

        {movies.map((movie) => (
          <ReviewRow key={movie.id} movie={movie} clickable={false} />
        ))}
      </Box>
    </>
  );
};

export default MyReviews;
