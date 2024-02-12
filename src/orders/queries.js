const getOrders = "SELECT * FROM orders";
const getOrdersByUserId = "SELECT * FROM orders WHERE user_id = $1";
const createOrder =
  "INSERT INTO orders (address, phone, date, user_id) VALUES ($1, $2, CURRENT_DATE, $3)";
const deleteOrder = "DELETE FROM orders WHERE id = $1";
const getOrderById = "SELECT * FROM orders WHERE id = $1";

module.exports = {
  getOrders,
  getOrdersByUserId,
  createOrder,
  deleteOrder,
  getOrderById,
};
