export const filterBySearch = (products, searchInput) => {
  console.log(products);
  return products.filter(({ title }) =>
    title.toLowerCase().includes(searchInput.toLowerCase().trim())
  );
};
