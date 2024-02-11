const pool = require("../db");
const queries = require("./queries");
const userQueries = require("../users/queries");

const getCarts = (req, res) => {
  pool.query(queries.getCarts, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const createCartByUserId = (req, res) => {
  const userId = req.params.userId;
  pool.query(userQueries.getUserById, [userId], (error, results) => {
    if (error) {
      throw error;
    }
    if (results.rows.length === 0) {
      res.status(404).send(`User not found with ID: ${userId}`);
      return;
    }

    pool.query(queries.getCartByUserId, [userId], (error, results) => {
      if (error) {
        throw error;
      }
      if (results.rows.length > 0) {
        res.status(409).send("Cart already exists for this user.");
        return;
      }

      pool.query(queries.createCartByUserId, [userId], (error, results) => {
        if (error) {
          throw error;
        }
        res.status(201).send(`Cart has been created.`);
      });
    });
  });
};

const getCartByUserId = (req, res) => {
  const userId = req.params.userId;

  pool.query(userQueries.getUserById, [userId], (error, results) => {
    if (error) {
      throw error;
    }
    if (results.rows.length === 0) {
      res.status(404).send(`User not found with ID: ${userId}`);
      return;
    }

    pool.query(queries.getCartByUserId, [userId], (error, results) => {
      if (error) {
        throw error;
      }
      if (results.rows.length === 0) {
        res.status(404).send(`Cart not found with user ID: ${userId}`);
        return;
      }
      res.status(200).json(results.rows);
    });
  });
};

const getCart = (req, res) => {
  pool.query(queries.getCartByUserId, [req.userId], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const createCart = (req, res) => {
  pool.query(queries.getCartByUserId, [req.userId], (error, results) => {
    if (error) {
      throw error;
    }
    if (results.rows.length > 0) {
      res.status(409).send("Cart already exists for this user.");
      return;
    }
    pool.query(queries.createCart, [req.userId], (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`Cart has been created.`);
    });
  });
};

const deleteCart = (req, res) => {
  const userId = req.params.userId;
  pool.query(queries.getCartByUserId, [userId], (error, results) => {
    if (error) {
      throw error;
    }
    if (results.rows.length === 0) {
      res.status(404).send(`Cart not found with user ID: ${userId}`);
      return;
    }
    pool.query(queries.deleteCart, [userId], (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`Cart has been deleted.`);
    });
  });
};

module.exports = {
  getCart,
  createCart,
  deleteCart,
  getCarts,
  getCartByUserId,
  createCartByUserId,
};
