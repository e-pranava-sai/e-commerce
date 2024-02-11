const pool = require("../db");
const queries = require("./queries");
const cartQueries = require("../cart/queries");
const userQueries = require("../users/queries");
const productQueries = require("../products/queries");

const getAllCartItems = (req, res) => {
  pool.query(queries.getAllCartItems, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const getCartItems = (req, res) => {
  const userId = req.userId;
  pool.query(queries.getCartItemsByUserId, [userId], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const getCartItemsByUserId = (req, res) => {
  const userId = req.params.userId;
  pool.query(userQueries.getUserById, [userId], (error, results) => {
    if (error) {
      throw error;
    }
    if (results.rows.length === 0) {
      res.status(404).send(`User not found for User ID: ${userId}`);
      return;
    }
    pool.query(queries.getCartItemsByUserId, [userId], (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    });
  });
};

const createCartItem = (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.userId;

  pool.query(productQueries.getProductById, [productId], (error, results) => {
    if (error) {
      throw error;
    }
    if (results.rows.length === 0) {
      res.status(404).send(`Product not found for Product ID: ${productId}`);
      return;
    }

    pool.query(cartQueries.getCartByUserId, [userId], (error, results) => {
      if (error) {
        throw error;
      }
      if (results.rows.length === 0) {
        res.status(404).send(`Cart not found for User ID: ${userId}`);
        return;
      }

      pool.query(
        queries.createCartItem,
        [userId, productId, quantity, results.rows[0].id],
        (error, results) => {
          if (error) {
            throw error;
          }
          res.status(201).send(`Cart item has been created.`);
        }
      );
    });
  });
};

const updateCartItem = (req, res) => {
  const cartItemId = req.params.cartItemId;
  const { quantity } = req.body;
  pool.query(queries.getCartItem, [cartItemId], (error, results) => {
    if (error) {
      throw error;
    }
    if (results.rows.length === 0) {
      res
        .status(404)
        .send(`Cart Item not found for Cart Item ID: ${cartItemId}`);
      return;
    }

    pool.query(
      queries.updateCartItem,
      [quantity, cartItemId],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(200).send(`Cart item has been updated.`);
      }
    );
  });
};

const deleteCartItem = (req, res) => {
  const cartItemId = req.params.cartItemId;
  const userId = req.userId;
  pool.query(queries.getCartItem, [cartItemId], (error, results) => {
    if (error) {
      throw error;
    }
    if (results.rows.length === 0) {
      res
        .status(404)
        .send(`Cart Item not found for Cart Item ID: ${cartItemId}`);
      return;
    }

    pool.query(queries.deleteCartItem, [cartItemId], (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`Cart item has been deleted.`);
    });
  });
};

module.exports = {
  getAllCartItems,
  getCartItems,
  getCartItemsByUserId,
  createCartItem,
  updateCartItem,
  deleteCartItem,
};
