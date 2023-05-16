import { useContext } from "react";
import { products } from "../backend/db/products";
import "../components/Products.css";
import { DataContext } from "../contexts/DataContext";

const Products = () => {
  const { addToCart } = useContext(DataContext);
  // const addToCart1 = (product) => {
  //   if (!token) {
  //     navigate("/login");
  //   } else {
  //     dispatchCart({ type: "ADD_TO_CART", payload: product });
  //     notifyCart();
  //   }
  // };
  return (
    <>
      <h2>Products Card - Store</h2>
      <label>
        Search:
        <input
          type="text"
          //   onChange={(e) => dispatch({ type: "INPUT", payload: e.target.value })}
        />
      </label>
      <button
      // onClick={() => dispatch({ type: "SEARCH", payload: state.inputText })}
      >
        Search
      </button>
      <br />
      <label>
        Price Range:
        <input type="range" min="0" max="1500" />
      </label>
      <fieldset>
        <legend>Sort by</legend>
        <label>
          <input
            type="radio"
            name="sort"
            value="htl"
            // onChange={() => dispatch({ type: "HTL" })}
          />
          Price - High to Low
        </label>
        <label>
          <input
            type="radio"
            name="sort"
            value="lth"
            // onChange={() => dispatch({ type: "LTH" })}
          />
          Price - Low to High
        </label>
      </fieldset>
      <fieldset>
        <legend>Filter by</legend>
        <label>
          <input
            type="checkbox"
            value="stock"
            // onChange={() => dispatch({ type: "IN_STOCK" })}
          />
          Out of Stock
        </label>
        <label>
          <input
            type="checkbox"
            value="stock"
            // onChange={() => dispatch({ type: "FAST_DELIVERY" })}
          />
          Fast Delivery
        </label>
      </fieldset>
      `
      <div className="product-cards">
        {products.map((product) => {
          return (
            <div className="product-card" key={product.id}>
              <img src={product.img} alt="pic1" width="50%" height="50%" />
              <h2>Name : {product.name}</h2>
              <p>Author : {product.author}</p>
              <p>Price : INR {product.price}</p>
              <p>Category : {product.category}</p>
              <button onClick={() => addToCart(product)}>Add to Card</button>
              <button>Add to Whishlist</button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Products;
