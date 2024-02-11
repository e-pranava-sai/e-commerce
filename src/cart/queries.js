const getCarts = "SELECT * FROM cart";
const getCart = "SELECT * FROM cart WHERE user_id = $1";
const createCart = "INSERT INTO cart (user_id) VALUES ($1)";
const deleteCart = "DELETE FROM cart WHERE user_id = $1";
const getCartByUserId = "SELECT * FROM cart WHERE user_id = $1";
const createCartByUserId = "INSERT INTO cart (user_id) VALUES ($1)";

module.exports = {
  getCart,
  getCarts,
  createCart,
  deleteCart,
  getCartByUserId,
  createCartByUserId,
};
