import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { UserProvider } from "./components/contexts/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserProvider>
    <App />
  </UserProvider>
);
