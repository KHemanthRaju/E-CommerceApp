import { useContext, useState } from "react";
import { DataContext } from "../../contexts/DataContext";
import "../Cart/Cart.css";
import { useCart } from "../../contexts/CartContext";

const Cart = () => {
  const { cartData } = useContext(DataContext);
  const [placeOrder, setPlaceOrder] = useState(false);
  const { cart, cart_total, dispatchCart } = useCart();
  const isCartFilled = cart.length > 0;
  const removeFromCart = (productId) => {
    dispatchCart({ type: "REMOVE_FROM_CART", payload: productId });
  };
  const increaseCartItem = (productId) => {
    dispatchCart({ type: "INCREASE_CART_COUNTER", payload: productId });
  };

  const decreaseCartItem = (productId, quantity) => {
    if (quantity <= 1) {
      removeFromCart(productId);
    } else {
      dispatchCart({ type: "DECREASE_CART_COUNTER", payload: productId });
    }
  };
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
            <div className="counter-section">
              <button
                className="counter-btn"
                onClick={() => decreaseCartItem(product, product.quantity)}
              >
                <span className="minus-symb">-</span>
              </button>
              <p className="items-quantity">{product.quantity}</p>
              <button
                className="counter-btn"
                onClick={() => increaseCartItem(product)}
              >
                <span className="add-symb">+</span>
              </button>
              <button className="remove-btn-cart">
                <i
                  className=" fa fa-times"
                  onClick={() => {
                    removeFromCart(product);
                  }}
                ></i>
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Cart;
