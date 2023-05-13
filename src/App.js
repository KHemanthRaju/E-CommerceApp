import "./App.css";
import { Routes, Route, NavLink } from "react-router-dom";
import Products from "./components/Products";

function App() {
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
          Cart
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
      </Routes>
    </div>
  );
}

export default App;
