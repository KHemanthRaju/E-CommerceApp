import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import DataReducer, { initialState } from "../reducers/DataReducer";

export const DataContext = createContext();
export const DataProvider = ({ children }) => {
  const [Datastate, Datadispatch] = useReducer(DataReducer, initialState);

  const getProducts = async () => {
    try {
      const { status, data } = await axios.get("/api/products");
      if (status === 200) {
        Datadispatch({
          type: "INITIALIZE_PRODUCTS",
          payload: data.products,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <DataContext.Provider value={{ Datastate, Datadispatch }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
