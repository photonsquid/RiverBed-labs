import React from "react";
import ReactDOM from "react-dom/client";
import { StyledEngineProvider } from "@mui/joy/styles";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import appTheme from "./utils/Theme";

import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <CssVarsProvider
        disableTransitionOnChange
        theme={appTheme}
        defaultMode="system"
        modeStorageKey="app-apperance-mode"
      >
        <CssBaseline />
        <App />
      </CssVarsProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);
