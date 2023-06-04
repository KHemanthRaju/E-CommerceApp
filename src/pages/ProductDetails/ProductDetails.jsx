import { useNavigate, useParams } from "react-router";
import "./ProductDetails.css";
import { useContext } from "react";
import { ProductContext } from "../../contexts/ProductContext";
import React from "react";
import { Link } from "react-router-dom";
import { useWishlist, useCart, useAuth } from "../../contexts/index";
import toast from "react-hot-toast";

const notifyCart = () => toast.success("Added to Card 👜 !!");
const notifyWishlist = () => toast.success("Added to Wishlist 💗 !! ");

export const ProductDetails = () => {
  const { wishlist, dispatchWishlist } = useWishlist();
  const { cart, dispatchCart } = useCart();
  const {
    user: { token },
  } = useAuth();

  const navigate = useNavigate();

  // add to wishlist
  const addToWishlist = (product) => {
    if (!token) {
      navigate("/login");
    } else {
      dispatchWishlist({ type: "ADD_TO_WISHLIST", payload: product });
      notifyWishlist();
    }
  };

  const removeFromWishlist = (productId) => {
    dispatchWishlist({ type: "REMOVE_FROM_WISHLIST", payload: productId });
  };

  const isInWishlist = (productId) => {
    return wishlist.some((product) => product._id === productId);
  };

  // Add to Cart
  const addToCart = (product) => {
    if (!token) {
      navigate("/login");
    } else {
      dispatchCart({ type: "ADD_TO_CART", payload: product });
      notifyCart();
    }
  };
  const { productId } = useParams();
  const { getProductDetail } = useContext(ProductContext);
  const product = getProductDetail(productId);
  const {
    img,
    badge,
    title,
    discountPrice,
    ratings,
    price,
    offerPercent,
    _id,
  } = product;
  const isAddedToWishlist = isInWishlist(_id);

  return (
    <div key={_id} className="product-in-container">
      <div className="product-in-container">
        <img
          src={img}
          className="product-in-image"
          alt="card"
          onClick={() => navigate(`/product/${_id}`)}
        />
        {/* <span className="card-badge">{badge}</span> */}

        <div className="product-in-detail">
          <div className="card-title">
            <div>
              <h3 className="product-in-title">{title}</h3>
            </div>
          </div>
          <div className="price">
            Price :<p className="product-in-price">{discountPrice}</p>
            <p className="actual-price"> {price}</p>
            <p class Name="price-percentage">
              {offerPercent}
            </p>
          </div>
        </div>
        <p className="product-in-rating">Ratings : {ratings}/5</p>
        {cart?.some((cartItem) => product._id === cartItem._id) ? (
          <Link to="/cart">
            <button className="btn btn-danger add-cart">Go to cart</button>
          </Link>
        ) : (
          <button
            className="btn btn-success add-cart"
            onClick={() => {
              addToCart(product);
            }}
          >
            Add to Cart
          </button>
        )}
        {wishlist?.some((cartItem) => product._id === cartItem._id) ? (
          <Link to="/wishlist">
            <button className="btn btn-danger add-cart">Go to wishlist</button>
          </Link>
        ) : (
          <button
            className="btn btn-success add-cart"
            onClick={() => {
              addToWishlist(product);
            }}
          >
            Add to Wishlist
          </button>
        )}
      </div>
    </div>
  );
};
