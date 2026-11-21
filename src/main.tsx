import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./i18n";
import Pagina from "./pages/tools/VozATextoPage";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Pagina />
  </React.StrictMode>,
);
