import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useWishlist, useCart, useAuth } from "../../contexts/index";
import { FaHeart, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { useData } from "../../contexts/DataContext";

const Navbar = () => {
  const { wishlist } = useWishlist();
  const { cart } = useCart();
  const navigate = useNavigate();
  const { Datadispatch } = useData();
  const {
    user: { token },
    logout,
  } = useAuth();

  const handlesearch = (event) => {
    event.target.length === 0
      ? Datadispatch({ type: "RESET" })
      : Datadispatch({ type: "SET_INPUT", payload: event.target.value });
    navigate("/product");
  };

  return (
    <nav>
      <div className="navbar_main">
        <Link to="/" className="header-name-a">
          SNAP CART
        </Link>

        <div className="nav-items">
          <input
            type="text"
            placeholder="Search here"
            className="search_bar"
            onChange={handlesearch}
          />
          <Link to="/product">Products</Link>
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
