import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import "./index.css";
import LoggedUserProvider from "./contexts/LoggedUserContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <LoggedUserProvider>
        <App />
      </LoggedUserProvider>
    </BrowserRouter>
  </StrictMode>
);
