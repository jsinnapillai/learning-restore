import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify"; // then this
import "react-toastify/dist/ReactToastify.css"; // import first

import { Outlet } from "react-router-dom";

import Header from "./Header";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  const paletteType = darkMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "light" ? "#eaeaea" : "#121212",
      },
    },
  });
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <ToastContainer position="bottom-right" hideProgressBar />
        <CssBaseline />
        <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
        <Container>
          <Outlet />
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
