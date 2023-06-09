export const getMinMaxPrice = (products) => {
  const prices = products.map((item) => item.price);
  return { minPrice: Math.min(...prices), maxPrice: Math.max(...prices) };
};
