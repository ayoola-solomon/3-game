import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";

import { App } from "App";
import { AppProvider } from "context/app.context";
import { GlobalStyles, color } from "utils/styles";

import * as serviceWorker from "./serviceWorker";
import "./index.css";

const theme = {
  fontSizes: [12, 14, 16, 24, 32, 48, 64],
  variants: {
    primary: color.primary,
    secondary: color.secondary,
  },
  buttons: {
    primary: {
      color: color.white,
      bg: color.primary,
    },
    secondary: {
      color: color.white,
      bg: color.secondary,
    },
  },
  color,
};

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <AppProvider>
      <GlobalStyles />
      <App />
    </AppProvider>
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
