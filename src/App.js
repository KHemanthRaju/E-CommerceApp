import "./App.css";
import { Routes, Route, NavLink } from "react-router-dom";
import Products from "./components/Products";
import Cart from "./pages/Cart/Cart";
import { useContext } from "react";
import { DataContext } from "./contexts/DataContext";
import Mockman from "mockman-js";

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
        <Route path="/cart" element={<Cart />} />
        <Route path="/mockapi" element={<Mockman />} />
      </Routes>
    </div>
  );
};

export default App;
