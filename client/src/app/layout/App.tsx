import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify"; // then this
import "react-toastify/dist/ReactToastify.css"; // import first

import { Outlet } from "react-router-dom";

import Header from "./Header";
import { useStoreContext } from "../context/StoreContext";
import { getCookie } from "../util/util";
import agent from "../api/agent";
import Loading from "./Loading";

function App() {
  const { setBasket } = useStoreContext();
  const [loadingBasket, setLoadingBasket] = useState(true);

  useEffect(() => {
    const buyerId = getCookie("buyerId");
    if (buyerId) {
      agent.Basket.get()
        .then((response) => setBasket(response))
        .catch((error) => console.log(error))
        .finally(() => setLoadingBasket(false));
    } else {
      setLoadingBasket(false);
    }
  }, [setBasket]);

  const [darkMode, setDarkMode] = useState(false);

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  if (loadingBasket) return <Loading message="Basket Loading" />;

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
