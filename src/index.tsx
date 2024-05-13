import React from "react";
import {  render } from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./state/store";

<style>@import url('https://fonts.googleapis.com/css2?family=Sen:wght@400..800&display=swap')</style>;

const rootElement = document.getElementById("root");

render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  rootElement
);
