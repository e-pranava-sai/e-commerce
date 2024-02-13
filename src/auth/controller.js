const jwt = require("jsonwebtoken");

const pool = require("../db");
const userQueries = require("../users/queries");

const auth = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      res.status(401).send("Unauthorized");
      return;
    }
    token = token.split(" ")[1];
    jwt.verify(token, "somesuperscretscret", (error, decoded) => {
      if (error) {
        console.log("error: ", error);
        res.status(401).send("Try again.");
        return;
      }
      if (decoded.exp < (new Date().getTime() + 1) / 1000) {
        res.status(401).send("Token expired");
        return;
      }
      req.userId = parseInt(decoded.userId);
      req.email = decoded.email;
      req.is_admin = decoded.is_admin;
      console.log("decoded: ", decoded);
      next();
    });
  } catch (e) {
    console.log(e);
    const error = new Error(e);
    error.httpStatusCode = 500;
    return next(error);
  }
};

const authorize = (req, res, next) => {
  if (!req.is_admin) {
    res.status(403).send("Forbidden");
    return;
  }
  next();
};

const login = (req, res) => {
  const { email, password } = req.body;
  pool.query(
    userQueries.getUserByEmailPassword,
    [email, password],
    (error, results) => {
      if (error) {
        throw error;
      }
      if (results.rows.length === 0) {
        res.status(404).send("User not found.");
        return;
      }
      const user = results.rows[0];
      if (user.password !== password) {
        res.status(401).send("Invalid password.");
        return;
      }
      const token = jwt.sign(
        {
          email: email,
          userId: user.id,
          is_admin: user.is_admin,
        },
        "somesuperscretscret",
        { expiresIn: "1h" }
      );
      res.status(200).json({ token });
    }
  );
};

const signup = (req, res) => {
  const { name, email, password, is_admin } = req.body;

  pool.query(userQueries.getUserByEmail, [email], (error, results) => {
    if (error) {
      throw error;
    }
    if (results.rows.length > 0) {
      res.status(409).send("User already exists with this email.");
      return;
    }

    pool.query(
      userQueries.createUser,
      [name, email, password, is_admin],
      (error, results) => {
        if (error) {
          throw error;
        }
        console.log(results.rows[0]);
        const token = jwt.sign(
          {
            email: email,
            userId: results.rows[0].id,
            is_admin: is_admin,
          },
          "somesuperscretscret",
          { expiresIn: "1h" }
        );
        res.status(201).send({ token });
      }
    );
  });
};

module.exports = { login, signup, auth, authorize };
