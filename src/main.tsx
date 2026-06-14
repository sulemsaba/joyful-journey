import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/exxonim/app/queryClient";
import { App } from "@/exxonim/app/App";
import "@/app/globals.css";

// Clear the CSS-only boot loader timer — React has mounted,
// so the boot loader is already replaced by the real app.
if (typeof window.__bootLoaderTimer !== "undefined") {
  clearTimeout(window.__bootLoaderTimer);
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
