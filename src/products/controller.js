const { client } = require("../caching/redis");
const pool = require("../db");
const queries = require("./queries");

const getProducts = (req, res) => {
  pool.query(queries.getProducts, async (error, results) => {
    if (error) {
      throw error;
    }

    if (!client.isOpen) {
      await client.connect();
    }

    console.log("request made to the database for products.");

    // cache the products for 1 hour
    await client.SETEX("products", 30, JSON.stringify(results.rows));

    res.status(200).json(results.rows);
  });
};

const getProductById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getProductById, [id], (error, results) => {
    if (error) {
      throw error;
    }
    if (results.rows.length === 0) {
      res.status(404).send(`Product not found with ID: ${id}`);
      return;
    }
    res.status(200).json(results.rows);
  });
};

const getProductCreatedByUserId = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getProductCreatedByUserId, [id], (error, results) => {
    if (error) {
      throw error;
    }
    if (results.rows.length === 0) {
      res.status(404).send(`Product not found with owner ID: ${id}`);
      return;
    }
    res.status(200).json(results.rows);
  });
};

const createProduct = (req, res) => {
  const { name, price, category, owner_id } = req.body;

  pool.query(queries.getProductByName, [name], (error, results) => {
    if (error) {
      throw error;
    }
    if (results.rows.length > 0) {
      res.status(409).send("Product already exists with this name.");
      return;
    }

    pool.query(
      queries.createProduct,
      [name, parseFloat(price), category, req.userId],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(201).send(`Product has been created.`);
      }
    );
  });
};

const deleteProduct = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getProductById, [id], (error, results) => {
    if (error) {
      throw error;
    }
    if (results.rows.length === 0) {
      res.status(404).send(`Product not found with ID: ${id}`);
      return;
    }
    pool.query(queries.deleteProduct, [id], (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`Product has been deleted.`);
    });
  });
};

const updateProduct = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, price, category } = req.body;
  pool.query(queries.getProductById, [id], (error, results) => {
    if (error) {
      throw error;
    }
    if (results.rows.length === 0) {
      res.status(404).send(`Product not found with ID: ${id}`);
      return;
    }
    pool.query(
      queries.updateProduct,
      [name, parseFloat(price), category, id],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(200).send(`Product has been updated.`);
      }
    );
  });
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
  getProductCreatedByUserId,
};
