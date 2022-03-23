import React from "react";
import ReactDOM from "react-dom";
import "./css/styles.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { RoleProvider } from "./context/RoleContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <RoleProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </RoleProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
