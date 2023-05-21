import { useEffect, useReducer, useState } from "react";
import { toast } from "react-hot-toast";
import { defaultFilterState, filterReducer } from "../../reducers";
import { useCart, useWishlist } from "../../contexts";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { css } from "@emotion/react";
import {
  filterByCategory,
  filterByPriceRange,
  filterByRating,
  filterbySort,
  getMinMaxPrice,
} from "../../utils";
import { BounceLoader } from "react-spinners";
import "../ProductPage/ProductPage.css";

const notifyCart = () => toast.success("Added to Cart");
const notifyWishlist = () => toast.success("Added to Wishlist");

const ProductPage = () => {
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useReducer(filterReducer, defaultFilterState);
  const { wishlist, dispatchWishlist } = useWishlist();
  const { cart, dispatchCart } = useCart();
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("/api/products");
      setProducts(data.products);
    })();
  }, []);

  //Loading Timeout
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
  const { priceSlider, category, rating, sortBy } = state;

  const filteredBySort = filterbySort(products, sortBy);
  const filteredByPriceRange = filterByPriceRange(filteredBySort, priceSlider);
  const filteredByRating = filterByRating(filteredByPriceRange, rating);
  const filteredProducts = filterByCategory(filteredByRating, category);

  const addToWishlist = (product) => {
    dispatchWishlist({ type: "ADD_TO_WISHLIST", payload: product });
  };

  const removeFromWishlist = (productId) => {
    dispatchWishlist({ type: "REMOVE_FROM_WISHLIST", payload: productId });
  };

  const isInWishlist = (productId) => {
    return wishlist.some((product) => product.id === productId);
  };

  const addToCart = (product) => {
    dispatchCart({ type: "ADD_TO_CART", payload: product });
  };

  const removeFromCart = (productId) => {
    dispatchCart({ type: "REMOVE_FROM_CART", payload: productId });
  };

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
                  <span className="check-desc">4 stars &amp; under</span>
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
                  <span className="check-desc">3 stars &amp; under</span>
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
                  <span className="check-desc">2 stars &amp; under</span>
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
                  <span className="check-desc">1 stars &amp; under</span>
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
                    // checked={sortBy === "HIGH-TO-LOW"}
                  />
                  <span className="check-desc">Price - High to Low</span>
                </label>
              </div>
            </div>
          </div>
          {/* right section display cards */}
          <div className="featured_container bd-grid">
            {filteredProducts.map((item) => {
              const {
                img,
                badge,
                title,
                discountPrice,
                price,
                offerPercent,
                category,
                rating,
                _id,
              } = item;

              const isAddedToWishlist = isInWishlist(_id);

              return (
                <div key={_id} className="featured_product">
                  <div className="card-vertical">
                    <img src={img} className="card-image" alt="card" />
                    <span className="card-badge">{badge}</span>
                    <i
                      className="fas fa-heart"
                      style={{ color: isAddedToWishlist ? "tomato" : "silver" }}
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
                        <p className="actual-price">{price}</p>
                        <p className="price-percentage">{offerPercent}</p>
                      </div>
                    </div>
                    {cart?.some((cartItem) => item._id === cartItem._id) ? (
                      <Link to="/cart">
                        <button className="btn btn-danger add-cart">
                          Go to Cart
                        </button>
                      </Link>
                    ) : (
                      <button
                        className="btn btn-success add-cart"
                        onClick={() => addToCart(item)}
                      >
                        Add to cart
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
export default ProductPage;
