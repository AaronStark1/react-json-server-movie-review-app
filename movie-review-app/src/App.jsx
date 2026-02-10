import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AddMovie from "./pages/AddMovie";
import Auth from "./pages/Auth";
import MyReviews from "./pages/MyReviews";
import EditReview from "./pages/EditReviews";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: `"IBM Plex Sans", Arial, sans-serif`,
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/add" element={<AddMovie />} />
        <Route path="/edit/:id" element={<EditReview />} />
        <Route path="/myreviews" element={<MyReviews />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
