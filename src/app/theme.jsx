import { createTheme } from "@mui/material";

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: { main: "#7C4DFF" },
      background: {
        default: mode === "dark" ? "#121212" : "#F5F7FB",
        paper: mode === "dark" ? "#1E1E1E" : "#FFFFFF"
      }
    },
    shape: { borderRadius: 16 }
  });
