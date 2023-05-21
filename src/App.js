import "./App.css";
import { Routes, Route, NavLink } from "react-router-dom";
import Products from "./components/Products";
import { useContext } from "react";
import { DataContext } from "./contexts/DataContext";
import Mockman from "mockman-js";
import ProductPage from "./pages/ProductPage/ProductPage";
import { CartPage } from "./pages/CartPage/CartPage";

const App = () => {
  const { cartData } = useContext(DataContext);
  const getStyle = ({ isActive }) => ({
    color: isActive ? "red" : "blue",
  });

  return (
    <div className="App">
      <header className="App-header"></header>

      <nav>
        <h3>Book Factory</h3>
        <NavLink to="/store" style={getStyle}>
          Store
        </NavLink>
        <NavLink to="/product" style={getStyle}>
          Product Page
        </NavLink>
        <NavLink to="/cart" style={getStyle}>
          Cart - {cartData.length}
        </NavLink>
        <NavLink to="/whishlist" style={getStyle}>
          Whishlist
        </NavLink>
        <NavLink to="/login" style={getStyle}>
          Login
        </NavLink>
      </nav>
      <Routes>
        <Route path="/" />
        <Route path="/store" element={<Products />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/mockapi" element={<Mockman />} />
      </Routes>
    </div>
  );
};

export default App;
