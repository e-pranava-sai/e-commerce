const getProducts = "SELECT * FROM products";
const getProductById = "SELECT * FROM products WHERE id = $1";
const getProductCreatedByUserId = "SELECT * FROM products WHERE owner_id = $1";
const getProductByName = "SELECT * FROM products WHERE name = $1";
const createProduct =
  "INSERT INTO products (name, price, category, owner_id) VALUES ($1, $2, $3, $4) RETURNING id";
const deleteProduct = "DELETE FROM products WHERE id = $1";
const updateProduct =
  "UPDATE products SET name = $1, price = $2, category = $3 WHERE id = $4";

module.exports = {
  getProducts,
  getProductById,
  getProductCreatedByUserId,
  getProductByName,
  createProduct,
  deleteProduct,
  updateProduct,
};
