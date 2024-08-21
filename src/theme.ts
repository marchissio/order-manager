// src/theme.ts
import { createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f0803c",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#19181f",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#19181f",
          color: "#ffffff",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#19181f",
          border: "2px solid #ffffff",
        },
      },
    },
  },
});

export default theme;
