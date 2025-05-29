import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import HomePage from "@/routes/home/Home";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { DetailsPage } from "./routes/details/Details";
import { Layout } from "@/layout/Layout";
import { FavoritesPage } from "./routes/favorites/FavoritesPage";

import "./styles/globals.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <HomePage />
      </Layout>
    ),
  },
  {
    path: "/details/:movieId",
    element: (
      <Layout>
        <DetailsPage />
      </Layout>
    ),
  },
  {
    path: "/favorites",
    element: (
      <Layout>
        <FavoritesPage />
      </Layout>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
