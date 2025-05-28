import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "@/routes/home/Home";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { Layout } from "@/layout/Layout";

import "./styles/globals.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Layout>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </Layout>
  </StrictMode>,
);
