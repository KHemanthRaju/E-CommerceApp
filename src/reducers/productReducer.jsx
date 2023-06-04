export const productReducer = (prevState, { type, payload }) => {
  switch (type) {
    case "SET_CATEGORY":
      return { ...prevState, categories: [...payload] };
    case "SET_PRODUCT":
      return { ...prevState, products: payload };
    case "SEARCH":
      return { ...prevState, searchInput: payload };
    default:
      return { ...prevState };
  }
};
