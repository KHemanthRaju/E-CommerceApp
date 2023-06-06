export const initialState = {
  chocolates: [],
  searchInput: "",
  categoryFilter: [],
  priceFilter: null,
  ratingFilter: 0,
  cart: [],
  wishlist: [],
  orderList: [],
};
const DataReducer = (state, action) => {
  switch (action.type) {
    case "INITIALIZE_PRODUCTS":
      return { ...state, chocolates: action.payload };
    case "PRICE_SORT":
      return { ...state, priceFilter: action.payload };
    case "SET_CATEGORY":
      return { ...state, categoryFilter: action.payload };
    case "SET_RATING":
      return { ...state, ratingFilter: action.payload };
    case "SET_INPUT":
      return { ...state, searchInput: action.payload };
    case "RESET":
      return {
        ...state,
        searchFilter: "",
        categoryFilter: [],
        priceFilter: null,
        ratingFilter: 0,
      };
    case "SET_CATEGORY_SHOP":
      return { ...state, categoryFilter: action.payload };
    case "ADD_TO_CART":
      return { ...state, cart: [...action.payload] };
    case "ADD_TO_WISHLIST":
      return { ...state, wishlist: [...action.payload] };
    case "REMOVE_ITEM_FROM_WISHLIST":
      return { ...state, wishlist: [...action.payload] };
    case "LOG_OUT":
      return {
        ...state,
        cart: [],
        wishlist: [],
      };
    case "INC_CART_QTY":
      return { ...state, cart: [...action.payload] };
    case "DEC_CART_QTY":
      return { ...state, cart: [...action.payload] };
    case "REMOVE_ITEM_IN_CART":
      return { ...state, cart: [...action.payload] };
    case "SET_ORDERLIST":
      return { ...state, orderList: [...state.orderList, action.payload] };
    case "ORDER_PLACED":
      return { ...state, cart: [] };
    default:
      return state;
  }
};

export default DataReducer;
