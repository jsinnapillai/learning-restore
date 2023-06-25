import { createBrowserRouter, Navigate } from "react-router-dom";
import NotFound from "../errors/NotFound";
import ServerError from "../errors/ServerError";
import AboutPage from "../features/about/AboutPage";
import Catalog from "../features/catalog/Catalog";
import ProductDetail from "../features/catalog/ProductDetail";
import ContactPage from "../features/ContactPage";
import HomePage from "../features/home/HomePage";
import App from "../layout/App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "catalog", element: <Catalog /> },
      { path: "catalog/:id", element: <ProductDetail /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "server-error", element: <ServerError /> },
      { path: "not-found", element: <NotFound /> },
      { path: "*", element: <Navigate replace to="not-found" /> },
    ],
  },
]);
