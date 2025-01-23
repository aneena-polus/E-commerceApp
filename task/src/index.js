import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ProductProvider } from "./Context/ProductContext.js";
import { AuthProvider } from "./Context/AuthContext.js";
import { Provider } from "react-redux";
import store from "./Redux/store.js"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <AuthProvider>
                <ProductProvider>
                    <App />
                </ProductProvider>
            </AuthProvider>
        </BrowserRouter>
    </Provider>
);
reportWebVitals();
