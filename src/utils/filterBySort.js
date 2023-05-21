export const filterBySort = (products, sortBy) => {
  console.log(sortBy);
  switch (sortBy) {
    case "LOW-TO-HIGH":
      return products.sort((a, b) => a.price - b.price);
    case "HIGH-TO-LOW":
      return products.sort((a, b) => b.price - a.price);
    default:
      return products;
  }
};
