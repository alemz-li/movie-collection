import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./index.css";
import Index, { loader as indexLoader } from "./routes/Index";
import Root from "./routes/Root";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <p>Something went wrong...</p>,
    loader: indexLoader(queryClient),
    children: [
      {
        index: true,
        element: <Index />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
);
