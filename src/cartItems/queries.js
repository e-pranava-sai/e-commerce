const getAllCartItems = "SELECT * FROM cart_items";
const getCartItemsByUserId = "SELECT * FROM cart_items WHERE user_id = $1";
const createCartItem =
  "INSERT INTO cart_items (user_id, product_id, quantity, cart_id) VALUES ($1, $2, $3, $4)";
const getCartItem = "SELECT * FROM cart_items WHERE id = $1";
const updateCartItem = "UPDATE cart_items SET quantity = $1 WHERE id = $2";
const deleteCartItem = "DELETE FROM cart_items WHERE id = $1";

module.exports = {
  getAllCartItems,
  getCartItemsByUserId,
  createCartItem,
  getCartItem,
  updateCartItem,
  deleteCartItem,
};
