import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { HashRouter } from "react-router-dom";
import { AuthProvider } from "react-auth-kit";

ReactDOM.createRoot(document.getElementById("root")).render(
    <AuthProvider
        authType={"cookie"}
        authName={"_auth"}
        cookieDomain={window.location.hostname}
        cookieSecure={false}
    >
        <HashRouter>
            <App />
        </HashRouter>
    </AuthProvider>
);
