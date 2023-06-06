import { products } from "../backend/db/products";
import { getMinMaxPrice } from "../utils/minMaxPrice";

const { maxPrice } = getMinMaxPrice(products);

export const defaultFilterState = {
  priceSlider: maxPrice,
  category: [],
  rating: "",
  sortBy: "HIGH-TO-LOW",
};
