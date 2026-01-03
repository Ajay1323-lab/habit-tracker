import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App";
import { ThemeProviderCustom } from "./context/ThemeContext";
import { HabitProvider } from "./context/HabitContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProviderCustom>
      <HabitProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HabitProvider>
    </ThemeProviderCustom>
  </React.StrictMode>
);
