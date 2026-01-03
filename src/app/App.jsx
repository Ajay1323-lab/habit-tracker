import { ThemeProvider, CssBaseline } from "@mui/material";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { getTheme } from "./theme";
import RoutesConfig from "./routes";

const App = () => {
  const { mode } = useContext(ThemeContext);

  return (
    <ThemeProvider theme={getTheme(mode)}>
      <CssBaseline />
      <RoutesConfig />
    </ThemeProvider>
  );
};

export default App;
