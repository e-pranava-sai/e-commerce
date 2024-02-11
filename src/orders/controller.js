const pool = require("../db");
const queries = require("./queries");

const getOrders = (req, res) => {
  pool.query(queries.getOrders, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const getOrdersByUserId = (req, res) => {
  const userId = req.params.userId;
  pool.query(queries.getOrdersByUserId, [userId], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const createOrder = (req, res) => {
  const { userId, productId, quantity, cartId } = req.body;
  pool.query(
    queries.createOrder,
    [userId, productId, quantity, cartId],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`Order has been created.`);
    }
  );
};

const deleteOrder = (req, res) => {
  const orderId = req.params.orderId;
  pool.query(queries.getOrderById, [orderId], (error, results) => {
    if (error) {
      throw error;
    }
    if (results.rows.length === 0) {
      res.status(404).send(`Order not found.`);
      return;
    }
    pool.query(queries.deleteOrder, [orderId], (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`Order has been deleted.`);
    });
  });
};

const getUserOrders = (req, res) => {
  const userId = req.userId;
  pool.query(queries.getOrdersByUserId, [userId], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const createUserOrder = (req, res) => {
  const userId = req.userId;
  const { productId, quantity } = req.body;
  pool.query(
    queries.createOrder,
    [userId, productId, quantity],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`Order has been created.`);
    }
  );
};

const deleteUserOrder = (req, res) => {
  const userId = req.userId;
  const orderId = req.params.orderId;
  pool.query(queries.deleteOrder, [userId, orderId], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`Order has been deleted.`);
  });
};

module.exports = {
  getUserOrders,
  createUserOrder,
  deleteUserOrder,
  getOrders,
  createOrder,
  deleteOrder,
  getOrdersByUserId,
};
