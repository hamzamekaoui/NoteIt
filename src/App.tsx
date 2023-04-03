import React from "react";
import ReactDOM from "react-dom/client";
import Notes from "./components/notes";
import "./styles.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Notes />
  </React.StrictMode>
);
