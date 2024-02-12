const pool = require("../db");
const queries = require("./queries");
const userQueries = require("../users/queries");

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
  pool.query(userQueries.getUserById, [userId], (error, results) => {
    if (error) {
      throw error;
    }

    if (results.rows.length === 0) {
      res.status(404).send(`No user found with id ${userId}`);
      return;
    }

    pool.query(queries.getOrdersByUserId, [userId], (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    });
  });
};

const createOrder = (req, res) => {
  const userId = req.userId;
  const { address, phone, date } = req.body;
  pool.query(
    queries.createOrder,
    [address, phone, userId],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`Order has been created.`);
    }
  );
};

const deleteOrderByOrderId = (req, res) => {
  const orderId = req.params.orderId;
  pool.query(queries.getOrderById, [orderId], (error, results) => {
    if (error) {
      throw error;
    }
    if (results.rows.length === 0) {
      res.status(404).send(`No order found with id ${orderId}`);
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

const createUserOrderByUserId = (req, res) => {
  const userId = req.params.userId;
  const { address, phone } = req.body;
  pool.query(
    queries.createOrder,
    [address, phone, userId],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`Order has been created.`);
    }
  );
};

module.exports = {
  getUserOrders,
  createUserOrderByUserId,
  deleteOrderByOrderId,
  getOrders,
  createOrder,
  getOrdersByUserId,
};
