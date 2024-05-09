import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./state/store";
import { HelmetProvider } from "react-helmet-async";

<style>@import url('https://fonts.googleapis.com/css2?family=Sen:wght@400..800&display=swap')</style>;
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <HelmetProvider> */}
        <App />
      {/* </HelmetProvider> */}
    </Provider>
  </React.StrictMode>
);

