import "./App.css";
import { Routes, Route, NavLink } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "./contexts/DataContext";
import Mockman from "mockman-js";
import { ProductPage } from "./pages/ProductPage/ProductPage";
import { CartPage } from "./pages/CartPage/CartPage";
import { WishlistPage } from "./pages/WishlistPage/WishlistPage";
import { HomePage } from "./pages/HomePage/HomePage";
import { Navbar } from "./components";
import ScrollToTop from "./ScrollToTop";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { cartData } = useContext(DataContext);
  const getStyle = ({ isActive }) => ({
    color: isActive ? "red" : "blue",
  });

  return (
    <div className="App">
      <header className="App-header"></header>
      <ScrollToTop />
      <Navbar />
      {/* <nav>
        <h3>Book Factory</h3>
        <NavLink to="/" style={getStyle}>
          Fancy Store
        </NavLink>
        <NavLink to="/product" style={getStyle}>
          Product Page
        </NavLink>
        <NavLink to="/cart" style={getStyle}>
          Cart - {cartData.length}
        </NavLink>
        <NavLink to="/wishlist" style={getStyle}>
          Whishlist
        </NavLink>
        <NavLink to="/login" style={getStyle}>
          Login
        </NavLink>
      </nav> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/mockapi" element={<Mockman />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
