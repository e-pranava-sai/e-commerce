const pool = require("../db");
const queries = require("./queries");
const userQueries = require("../users/queries");
const productQueries = require("../products/queries");
const orderQueries = require("../orders/queries");

const getAllOrderItems = (req, res) => {
  pool.query(queries.getAllOrderItems, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const getOrderItems = (req, res) => {
  const userId = req.userId;
  pool.query(queries.getOrderItemsByUserId, [userId], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const getOrderItemsByUserId = (req, res) => {
  const userId = req.params.userId;
  pool.query(userQueries.getUserById, [userId], (error, results) => {
    if (error) {
      throw error;
    }
    if (results.rows.length === 0) {
      res.status(404).send(`User not found for User ID: ${userId}`);
      return;
    }
    pool.query(queries.getOrderItemsByUserId, [userId], (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    });
  });
};

const createOrderItemForOrderId = (req, res) => {
  const { product_id, quantity } = req.body;
  const userId = req.userId;
  const orderId = req.params.orderId;
  let price;

  pool.query(productQueries.getProductById, [product_id], (error, results) => {
    if (error) {
      throw error;
    }
    if (results.rows.length === 0) {
      res.status(404).send(`Product not found for Product ID: ${product_id}`);
      return;
    }

    price = results.rows[0].price;

    pool.query(orderQueries.getOrderById, [orderId], (error, results) => {
      if (error) {
        throw error;
      }

      if (results.rows.length === 0) {
        res.status(404).send(`Order not found for Order ID: ${orderId}`);
        return;
      }

      if (parseInt(results.rows[0].user_id) !== userId) {
        res
          .status(403)
          .send(`User not authorized to add item to Order ID: ${orderId}`);
        return;
      }

      pool.query(
        queries.createOrderItem,
        [orderId, product_id, userId, price, quantity],
        (error, results) => {
          if (error) {
            throw error;
          }
          res.status(201).send(`Order item added.`);
        }
      );
    });
  });
};

const createOrderItemForOrderIdByUserId = (req, res) => {
  const { product_id, quantity } = req.body;
  const userId = req.params.userId;
  const orderId = req.params.orderId;

  pool.query(userQueries.getUserById, [userId], (error, results) => {
    if (error) {
      throw error;
    }
    if (results.rows.length === 0) {
      res.status(404).send(`User not found for User ID: ${userId}`);
      return;
    }

    pool.query(orderQueries.getOrderById, [orderId], (error, results) => {
      if (error) {
        throw error;
      }
      if (results.rows.length === 0) {
        res.status(404).send(`Order not found for Order ID: ${orderId}`);
        return;
      }

      if (parseInt(results.rows[0].user_id) !== parseInt(userId)) {
        res
          .status(403)
          .send(`User not authorized to add item to Order ID: ${orderId}`);
        return;
      }

      pool.query(
        productQueries.getProductById,
        [product_id],
        (error, results) => {
          if (error) {
            throw error;
          }
          if (results.rows.length === 0) {
            res
              .status(404)
              .send(`Product not found for Product ID: ${product_id}`);
            return;
          }

          pool.query(
            queries.createOrderItem,
            [orderId, product_id, userId, results.rows[0].price, quantity],
            (error, results) => {
              if (error) {
                throw error;
              }
              res.status(201).send(`Order item added.`);
            }
          );
        }
      );
    });
  });
};

const updateOrderItem = (req, res) => {
  const orderItemId = req.params.orderItemId;
  const { quantity } = req.body;

  pool.query(queries.getOrderItemById, [orderItemId], (error, results) => {
    if (error) {
      throw error;
    }
    if (results.rows.length === 0) {
      res.status(404).send(`Order item not found for ID: ${orderItemId}`);
      return;
    }
    pool.query(
      queries.updateOrderItem,
      [quantity, orderItemId],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(200).send(`Order item modified with ID: ${orderItemId}`);
      }
    );
  });
};

const deleteOrderItem = (req, res) => {
  const orderItemId = req.params.orderItemId;
  pool.query(queries.deleteOrderItem, [orderItemId], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`Order item deleted with ID: ${orderItemId}`);
  });
};

module.exports = {
  getAllOrderItems,
  getOrderItems,
  getOrderItemsByUserId,
  createOrderItemForOrderId,
  createOrderItemForOrderIdByUserId,
  updateOrderItem,
  deleteOrderItem,
};
