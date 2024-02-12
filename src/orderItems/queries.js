const getAllOrderItems = "SELECT * FROM order_items";
const getOrderItemsByUserId = "SELECT * FROM order_items WHERE user_id = $1";
const createOrderItem =
  "INSERT INTO order_items (order_id, product_id, user_id, product_price, quantity) VALUES ($1, $2, $3, $4, $5)";
const deleteOrderItem = "DELETE FROM order_items WHERE id = $1";
const getOrderItemById = "SELECT * FROM order_items WHERE id = $1";
const updateOrderItem = "UPDATE order_items SET quantity = $1 WHERE id = $2";

module.exports = {
  getAllOrderItems,
  getOrderItemsByUserId,
  createOrderItem,
  deleteOrderItem,
  getOrderItemById,
  updateOrderItem,
};
