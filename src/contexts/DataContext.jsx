import { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [cartData, setCartData] = useState([]);
  const addToCart = (newData) => setCartData([...cartData, newData]);
  return (
    <DataContext.Provider value={{ addToCart, cartData }}>
      {children}
    </DataContext.Provider>
  );
};
