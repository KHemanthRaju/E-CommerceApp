import { createContext, useContext, useReducer } from "react";
import { cartReducer } from "../reducers/cartReducer";

const CartContext = createContext();

const initialStateCart = {
  cart: [],
  cart_total: 0,
  actualPriceSum: 0,
  discount: 0,
  filter: {
    searchQuery: "",
  },
};
console.log(initialStateCart.filter.searchQuery);
export const CartProvider = ({ children }) => {
  const [cartState, dispatchCart] = useReducer(cartReducer, initialStateCart);

  const clearCart = () => {
    dispatchCart({ type: "CLEAR_CART", payload: [] });
  };
  const addFilterQuery = (e) => {
    dispatchCart({ type: "FILTER_QUERY", payload: e.target.value });
  };
  return (
    <CartContext.Provider
      value={{
        ...cartState,
        dispatchCart,
        clearCart,
        addFilterQuery,
        searchQuery: cartState.filter.searchQuery,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export function useCart() {
  return useContext(CartContext);
}
