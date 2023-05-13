import { products } from "../backend/db/products";
import "../components/Products.css";

const Products = () => {
  return (
    <>
      <h2>Products Card - Store</h2>
      <div className="product-cards">
        {products.map((product) => {
          return (
            <div className="product-card" key={product.id}>
              <h2>Title : {product.title}</h2>
              <p>Author : {product.author}</p>
              <p>Price : INR {product.price}</p>
              <button>Add to Card</button>
              <button>Add to Whishlist</button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Products;
