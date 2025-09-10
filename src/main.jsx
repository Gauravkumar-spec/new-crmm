import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./assets/css/app.css";

// ✅ Import Redux Provider and your store
import { Provider } from "react-redux";
import { store } from "./stores/store";  // make sure ./store.js exports your Redux store

const container = document.getElementById("root");
const root = createRoot(container);

// ✅ Wrap App with Provider
root.render(

  <Provider store={store}>
    <App />
  </Provider>
);
