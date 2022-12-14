import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ScheduleProvider } from "./context/ScheduleContextProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ScheduleProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ScheduleProvider>
);
