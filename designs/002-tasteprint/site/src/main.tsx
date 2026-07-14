import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { TasteprintApp } from "./TasteprintApp";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TasteprintApp />
  </StrictMode>,
);
