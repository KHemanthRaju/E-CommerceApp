import { createContext, useContext, useReducer } from "react";
import { WishlistReducer } from "../reducers/wishlistReducer";

const WishlistContext = createContext();

const initialState = {
  wishlist: [],
};

export const WishlistProvider = ({ children }) => {
  const [wishlistState, dispatchWishlist] = useReducer(
    WishlistReducer,
    initialState
  );

  return (
    <WishlistContext.Provider
      value={{ ...wishlistState, wishlistState, dispatchWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
