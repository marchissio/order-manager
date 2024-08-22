import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRoutes from "./router/AppRoutes";
import "./index.css";
import { ThemeProvider, CssBaseline } from "@mui/material/";
import theme from "./theme";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRoutes />
    </ThemeProvider>
  </StrictMode>
);
