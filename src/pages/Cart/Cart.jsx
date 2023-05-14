import { useContext } from "react";
import { DataContext } from "../../contexts/DataContext";
import "../Cart/Cart.css";

const Cart = () => {
  const { cartData } = useContext(DataContext);
  return (
    <>
      <h2>Cart Page</h2>
      {cartData.map((product) => {
        return (
          <div className="product-card" key={product.id}>
            <img src={product.img} alt="pic1" width="50%" height="50%" />
            <h2>Name : {product.name}</h2>
            <p>Author : {product.author}</p>
            <p>Price : INR {product.price}</p>
            <p>Category : {product.category}</p>
            <button>Add to Whishlist</button>
          </div>
        );
      })}
    </>
  );
};

export default Cart;
