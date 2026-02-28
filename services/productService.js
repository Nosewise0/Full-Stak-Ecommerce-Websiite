let cachedProducts = [];

const fetchProductsFromAPI = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) {
      throw new Error("Failed to fetch products from API");
    }
    cachedProducts = await response.json();
    return cachedProducts;
  } catch (error) {
    console.error("Error fetching products:", error);
    return cachedProducts;
  }
};

module.exports = { fetchProductsFromAPI };
