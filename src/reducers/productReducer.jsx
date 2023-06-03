export const productReducer = (prevState, { type, payload }) => {
  switch (type) {
    case "SET_CATEGORY":
      return { ...prevState, categories: [...payload] };
    case "SET_PRODUCT":
      return { ...prevState, products: payload };
    default:
      return { ...prevState };
  }
};
