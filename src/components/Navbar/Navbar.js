import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useWishlist, useCart, useAuth } from "../../contexts/index";
import { FaHeart, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { useContext, useRef } from "react";
import { CartContext } from "../../contexts/CartContext";

const Navbar = () => {
  const timerId = useRef();
  const { wishlist } = useWishlist();
  const { cart } = useCart();
  const navigate = useNavigate();
  const { addFilterQuery } = useContext(CartContext);

  const {
    user: { token },
    logout,
  } = useAuth();

  const searchHandler = (e) => {
    navigate("/product");
    addFilterQuery(e);
  };
  const debounceSearch = (callback, e, delay) => {
    clearTimeout(timerId.current);
    timerId.current = setTimeout(() => callback(e), delay);
  };

  return (
    <nav className="navbar_container">
      <div className="navbar_main">
        <Link to="/">
          <img
            src="/img/Hogwarts Supplies.png"
            className="brand-logo"
            alt="logo"
          />
        </Link>
        <input
          className="search-input"
          type="text"
          placeholder="Search"
          onChange={(e) => debounceSearch(searchHandler, e, 500)}
        />
        <div className="nav-items">
          <div className="search">
            <input type="text" className="search-box" placeholder="search" />
            <button className="search-btn">
              <i className="fa fa-search"></i>
            </button>
          </div>
          <Link to="/wishlist">
            <FaHeart size={25} />
            {token ? (
              <span className="count-notify">{wishlist.length}</span>
            ) : null}
          </Link>
          <Link to="/cart">
            <FaShoppingCart size={25} />
            {token ? <span className="count-notify">{cart.length}</span> : null}
          </Link>
          <Link to="/account">{token ? "Account" : ""}</Link>
          {token ? (
            <button
              className="btn btn-danger"
              onClick={() => {
                logout();
              }}
            >
              Logout
            </button>
          ) : (
            <Link to="/signup">
              <FaUserCircle size={25} />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export { Navbar };
