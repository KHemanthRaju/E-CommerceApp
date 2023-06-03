import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { DataProvider, DataContext } from "./contexts/DataContext";
import { CartProvider } from "./contexts/CartContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import { AuthProvider } from "./contexts/AuthContext";
import { AddressContextProvider } from "./contexts/AddressContext";

// Call make Server
makeServer();

export { DataContext };

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <DataProvider>
        <CartProvider>
          <WishlistProvider>
            <AddressContextProvider>
              <AuthProvider>
                <App />
              </AuthProvider>
            </AddressContextProvider>
          </WishlistProvider>
        </CartProvider>
      </DataProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
