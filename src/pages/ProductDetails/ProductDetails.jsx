import { useLocation, useNavigate, useParams } from "react-router";
import "./ProductDetails.css";
import { useContext } from "react";
import { BsCartFill } from "react-icons/bs";
import { ProductContext } from "../../contexts/ProductContext";
import { CartContext } from "../../contexts/CartContext";
import { AuthContext } from "../../contexts/AuthContext";
import React, { useReducer, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { defaultFilterState, filterReducer } from "../../reducers/index";
import {
  getMinMaxPrice,
  filterBySort,
  filterByPriceRange,
  filterByRating,
  filterBySearch,
  filterByCategory,
} from "../../utils/index";
import { useWishlist, useCart, useAuth } from "../../contexts/index";
import toast, { Toaster } from "react-hot-toast";
import { css } from "@emotion/react";

const notifyCart = () => toast.success("Added to Card 👜 !!");
const notifyWishlist = () => toast.success("Added to Wishlist 💗 !! ");

export const ProductDetails = () => {
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useReducer(filterReducer, defaultFilterState);
  const { wishlist, dispatchWishlist } = useWishlist();
  const { cart, dispatchCart } = useCart();
  const [products, setProducts] = useState([]);
  const {
    user: { token },
  } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("/api/products");
      setProducts(data.products);
    })();
  }, []);

  // Loading timeout
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, []);

  const override = css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `;

  const { minPrice, maxPrice } = getMinMaxPrice(products);
  const { priceSlider, category, rating, sortby, search } = state;

  const filteredBySort = filterBySort(products, sortby);
  // const filteredSearch = filterBySearch(filteredBySort, search);
  const filteredByPriceRange = filterByPriceRange(filteredBySort, priceSlider);
  const filteredByRating = filterByRating(filteredByPriceRange, rating);
  const filteredProducts = filterByCategory(filteredByRating, category);

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
  const { checkLogin } = useContext(AuthContext);
  const product = getProductDetail(productId);
  const { img, badge, title, discountPrice, price, offerPercent, _id } =
    product;
  const isAddedToWishlist = isInWishlist(_id);
  const location = useLocation();
  const success = (product, place, action = "Added") => {
    let preposition = "to";
    if (action === "Removed") {
      preposition = "from";
    }
    return toast.success(
      `${action} 1 ${product.description} ${preposition} ${place}`,
      {
        position: "bottom-right",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
      }
    );
  };
  return (
    <div key={_id} className="featured__product">
      <div className="card-vertical">
        <img
          src={img}
          className="card-image"
          alt="card"
          onClick={() => navigate(`/product/${_id}`)}
        />
        <span className="card-badge">{badge}</span>
        <i
          className="fas fa-heart"
          style={{
            color: isAddedToWishlist ? "tomato" : "silver",
          }}
          onClick={() => {
            if (isAddedToWishlist) {
              removeFromWishlist(_id);
            } else {
              addToWishlist(product);
            }
          }}
        ></i>
        <div className="card-info">
          <div className="card-title">
            <div>
              <h3 className="card-title-header">{title}</h3>
            </div>
          </div>
          <div className="price">
            <p className="disc-price">{discountPrice}</p>
            <p className="actual-price"> {price}</p>
            <p class Name="price-percentage">
              {offerPercent}
            </p>
          </div>
        </div>
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
      </div>
    </div>
  );
  //   return (
  //     <>
  //       <div key={_id} className="product-in-container">
  //         <img src={img} className="product-in-image" alt={description} />
  //         <div className="product-in-detail">
  //           <h2 className="product-in-title">{title}</h2>
  //           <p className="product-in-description">{description}</p>
  //           <p className="product-in-time">Delivery time: {delivery_time} Days</p>
  //           <span className="product-in-price">
  //             {discounted_price}
  //             <span className="product-in-discounted-price">{price}</span>
  //           </span>
  //           <span className="product-in-rating">{rating}/5</span>
  //           <span className="product-in-size">{size}</span>
  //         </div>
  //       </div>
  //     </>
  //   );
};
