import React, { useReducer, useEffect, useState } from "react";
import axios from "axios";
import "./ProductPage.css";
import { Link, useNavigate } from "react-router-dom";
import { defaultFilterState, filterReducer } from "../../reducers/index";
import {
  getMinMaxPrice,
  filterBySort,
  filterByPriceRange,
  filterByRating,
  filterByCategory,
} from "../../utils/index";
import { useWishlist, useCart, useAuth } from "../../contexts/index";
import toast from "react-hot-toast";
import { BounceLoader } from "react-spinners";
import { css } from "@emotion/react";
import { useData } from "../../contexts/DataContext";

const notifyCart = () => toast.success("Added to Card 👜 !!");
const notifyWishlist = () => toast.success("Added to Wishlist 💗 !! ");

export const ProductPage = () => {
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useReducer(filterReducer, defaultFilterState);
  const { wishlist, dispatchWishlist } = useWishlist();
  const { cart, dispatchCart } = useCart();
  const [products, setProducts] = useState([]);
  const {
    user: { token },
  } = useAuth();

  const { Datastate } = useData();

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
    top: 100%;
    left: 50%;
    transform: translate(-50%, -50%);
  `;

  const { minPrice, maxPrice } = getMinMaxPrice(products);
  const { priceSlider, category, rating, sortby } = state;

  const filteredBySort = filterBySort(products, sortby);

  const filteredByPriceRange = filterByPriceRange(filteredBySort, priceSlider);
  const filteredByRating = filterByRating(filteredByPriceRange, rating);
  const filteredProducts = filterByCategory(filteredByRating, category);
  const filteredSearch =
    Datastate.searchInput.length === 0
      ? filteredProducts
      : filteredProducts.filter((item) =>
          item.title.toLowerCase().includes(Datastate.searchInput.toLowerCase())
        );

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

  // const removeFromCart = (productId) => {
  //   dispatchWishlist({ type: "REMOVE_FROM_CART", payload: productId });
  // };

  return (
    <>
      {loading ? (
        <BounceLoader loading={loading} color={"#26BD65"} css={override} />
      ) : (
        <main className="main-product">
          <div className="filter-wrapper">
            <div className="filter-header">
              <h4>Filters</h4>
              <button
                className="btn danger-outline"
                onClick={(e) => {
                  dispatch({ type: "CLEAR-FILTER", payload: e.target.value });
                }}
              >
                Clear
              </button>
            </div>
            <div className="priceSlider">
              <h3>Price</h3>
              <div className="range-gap">
                <div className="range-price">
                  <p>{minPrice}</p>
                  <p>{~~(maxPrice + minPrice) / 2}</p>
                  <p>{maxPrice}</p>
                </div>
                <input
                  type="range"
                  onInput={(e) => {
                    dispatch({ type: "PRICE-SLIDER", payload: e.target.value });
                  }}
                  min={minPrice}
                  max={maxPrice}
                  value={priceSlider}
                  className="slider"
                />
              </div>
            </div>
            <div className="filter_category">
              <h3>Category</h3>
              <div className="filter-gap">
                <label className="select-input">
                  <input
                    type="checkbox"
                    name="category"
                    value="category"
                    className="checkbox-input"
                    onChange={(e) => {
                      dispatch({ type: "CATEGORY", payload: "Tshirt" });
                    }}
                    checked={category.includes("Tshirt")}
                  />
                  <span className="check-desc">Tshirt</span>
                </label>
                <label className="select-input">
                  <input
                    type="checkbox"
                    name="category"
                    value="category"
                    className="checkbox-input"
                    onChange={(e) => {
                      dispatch({ type: "CATEGORY", payload: "Toys" });
                    }}
                    checked={category.includes("Toys")}
                  />
                  <span className="check-desc">Toys</span>
                </label>
                <label className="select-input">
                  <input
                    type="checkbox"
                    name="category"
                    value="category"
                    className="checkbox-input"
                    onChange={(e) => {
                      dispatch({ type: "CATEGORY", payload: "Acessories" });
                    }}
                    checked={category.includes("Acessories")}
                  />
                  <span className="check-desc">Acessories</span>
                </label>
              </div>
            </div>
            <div className="filter_rating">
              <h3>Filter</h3>
              <div className="rating-gap">
                <label className="select-input">
                  <input
                    type="radio"
                    name="rating"
                    className="radio-input"
                    onChange={(e) => {
                      dispatch({ type: "RATING", payload: "4-AND-ABOVE" });
                    }}
                    checked={rating === "4-AND-ABOVE"}
                  />
                  <span className="check-desc">4 Stars &amp; under</span>
                </label>
                <label className="select-input">
                  <input
                    type="radio"
                    name="rating"
                    className="radio-input"
                    onChange={(e) => {
                      dispatch({ type: "RATING", payload: "3-AND-ABOVE" });
                    }}
                    checked={rating === "3-AND-ABOVE"}
                  />
                  <span className="check-desc">3 Stars &amp; under</span>
                </label>
                <label className="select-input">
                  <input
                    type="radio"
                    name="rating"
                    className="radio-input"
                    onChange={(e) => {
                      dispatch({ type: "RATING", payload: "2-AND-ABOVE" });
                    }}
                    checked={rating === "2-AND-ABOVE"}
                  />
                  <span className="check-desc">2 Stars &amp; under</span>
                </label>
                <label className="select-input">
                  <input
                    type="radio"
                    name="rating"
                    className="radio-input"
                    onChange={(e) => {
                      dispatch({ type: "RATING", payload: "1-AND-ABOVE" });
                    }}
                    checked={rating === "1-AND-ABOVE"}
                  />
                  <span className="check-desc">1 Stars &amp; under</span>
                </label>
              </div>
            </div>
            <div className="filter_sort">
              <h3>Sort By</h3>
              <div className="sort_gap">
                <label className="select-input">
                  <input
                    type="radio"
                    name="sort-price"
                    className="radio-input"
                    onChange={(e) => {
                      dispatch({ type: "SORT", payload: "LOW-TO-HIGH" });
                    }}
                  />
                  <span className="check-desc">Price - Low to High</span>
                </label>
                <label className="select-input">
                  <input
                    type="radio"
                    name="sort-price"
                    className="radio-input"
                    onChange={(e) => {
                      dispatch({ type: "SORT", payload: "HIGH-TO-LOW" });
                    }}
                    checked={sortby === "HIGH-TO-LOW"}
                  />
                  <span className="check-desc">Price - High to Low</span>
                </label>
              </div>
            </div>
          </div>

          {/* right section display cards */}
          <div className="featured__container bd-grid">
            {filteredSearch.map((item) => {
              const {
                img,
                badge,
                title,
                discountPrice,
                price,
                offerPercent,
                _id,
              } = item;
              const isAddedToWishlist = isInWishlist(_id);

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
                          addToWishlist(item);
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
                    {cart?.some((cartItem) => item._id === cartItem._id) ? (
                      <Link to="/cart">
                        <button className="btn btn-danger add-cart">
                          Go to cart
                        </button>
                      </Link>
                    ) : (
                      <button
                        className="btn btn-success add-cart"
                        onClick={() => {
                          addToCart(item);
                        }}
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      )}
    </>
  );
};
