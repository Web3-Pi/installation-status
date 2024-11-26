import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider
      client={
        new QueryClient({
          defaultOptions: {
            queries: { retry: true, retryDelay: 3000, refetchInterval: 5000 },
          },
        })
      }
    >
      <App />
    </QueryClientProvider>
  </StrictMode>
);
