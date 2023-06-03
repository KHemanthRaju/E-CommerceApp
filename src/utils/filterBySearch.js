export const filterBySearch = (products, search) => {
  console.log(products);
  return products.filter(({ title }) =>
    title.toLowerCase().includes(search.toLowerCase().trim())
  );
};
