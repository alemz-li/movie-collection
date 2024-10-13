import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./index.css";
import Index from "./routes/Index";
import Root from "./routes/Root";
import Dashboard from "./routes/(admin)/Dashboard";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <p>Something went wrong...</p>,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "/collection",
        element: <p>Collection</p>,
        errorElement: <p>Something went wrong...</p>,
      },
    ],
  },
  {
    path: "/admin",
    element: <Dashboard />,
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
