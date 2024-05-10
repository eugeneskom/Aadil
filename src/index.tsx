import React from "react";
import { hydrate, render } from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./state/store";
import { HelmetProvider } from "react-helmet-async";

<style>@import url('https://fonts.googleapis.com/css2?family=Sen:wght@400..800&display=swap')</style>;

const rootElement = document.getElementById("root");

if (rootElement?.hasChildNodes()) {
  hydrate(
    <React.StrictMode>
      <Provider store={store}>
        {/* <HelmetProvider> */}
        <App />
        {/* </HelmetProvider> */}
      </Provider>
    </React.StrictMode>,
    rootElement
  );
} else {
  render(
    <React.StrictMode>
      <Provider store={store}>
        {/* <HelmetProvider> */}
        <App />
        {/* </HelmetProvider> */}
      </Provider>
    </React.StrictMode>,
    rootElement
  );
}