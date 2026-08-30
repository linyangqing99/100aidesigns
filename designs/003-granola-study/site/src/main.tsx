import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { GranolaStudyApp } from "./GranolaStudyApp";
import "./standalone.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GranolaStudyApp />
  </StrictMode>,
);
