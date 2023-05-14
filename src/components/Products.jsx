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
              <img src={product.img} alt="picture" width="50%" height="50%" />
              <h2>Name : {product.name}</h2>
              <p>Author : {product.author}</p>
              <p>Price : INR {product.price}</p>
              <p>Category : {product.category}</p>
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
