import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { useThemeStore } from "./store/useThemeStore";

function Root() {
  const { theme } = useThemeStore();

  return (
    <div data-theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);