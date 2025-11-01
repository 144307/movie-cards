import "./reset.css";
import "./global_styles.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { store } from "./store.ts";
import { Provider } from "react-redux";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
