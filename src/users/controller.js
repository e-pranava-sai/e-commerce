const pool = require("../db");
const queries = require("./queries");

const getUsers = (req, res) => {
  pool.query(queries.getUsers, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getUserById, [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const createUser = (req, res) => {
  const { name, email, password, is_admin } = req.body;

  pool.query(queries.getUserByEmail, [email], (error, results) => {
    if (error) {
      throw error;
    }
    if (results.rows.length > 0) {
      res.status(409).send("User already exists with this email.");
      return;
    }

    pool.query(
      queries.createUser,
      [name, email, password, is_admin],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(201).send(`User has been created.`);
      }
    );
  });
};

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getUserById, [id], (error, results) => {
    if (error) {
      throw error;
    }
    if (results.rows.length === 0) {
      res.status(404).send(`User not found with ID: ${id}`);
      return;
    }
    pool.query(queries.deleteUser, [id], (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`User deleted with ID: ${id}`);
    });
  });
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email, password } = req.body;
  pool.query(queries.getUserById, [id], (error, results) => {
    if (error) {
      throw error;
    }
    if (results.rows.length === 0) {
      res.status(404).send(`User not found with ID: ${id}`);
      return;
    }

    pool.query(queries.getUserByEmail, [email], (error, results) => {
      if (error) {
        throw error;
      }
      if (results.rows.length > 0) {
        res.status(409).send("User already exists with this email.");
        return;
      }

      pool.query(
        queries.updateUser,
        [name, email, password, id],
        (error, results) => {
          if (error) {
            throw error;
          }
          res.status(200).send(`User modified with ID: ${id}`);
        }
      );
    });
  });
};

module.exports = { getUsers, getUserById, createUser, deleteUser, updateUser };
