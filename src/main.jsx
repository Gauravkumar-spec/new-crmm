import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./assets/css/app.css";

// ✅ Import Redux Provider and your store
import { Provider } from "react-redux";
import { store } from "./stores/store"; // make sure ./store.js exports your Redux store
import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from "./stores/msalInstance.js"; // 👈 Same instance used here

const container = document.getElementById("root");
const root = createRoot(container);

// ✅ Wrap App with Provider
root.render(
    <MsalProvider instance={msalInstance}>
        <Provider store={store}>
            <App />
        </Provider>
    </MsalProvider>
);
