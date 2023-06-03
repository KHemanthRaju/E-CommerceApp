import { products } from "../backend/db/products";
import { getMinMaxPrice } from "../utils/minMaxPrice";

const { maxPrice } = getMinMaxPrice(products);

const defaultFilterState = {
  priceSlider: maxPrice,
  category: [],
  rating: "1-AND-ABOVE",
  sortBy: "HIGH-TO-LOW",
  search: "",
};

export { defaultFilterState };
