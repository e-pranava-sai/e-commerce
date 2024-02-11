const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, ".env"),
  override: true,
});
const express = require("express");

const userRoutes = require("./src/users/routes");
const productRoutes = require("./src/products/routes");
const authRoutes = require("./src/auth/routes");
const cartRoutes = require("./src/cart/routes");
const orderRoutes = require("./src/orders/routes");
const cartItemRoutes = require("./src/cartItems/routes");
const authController = require("./src/auth/controller");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to e-commerce API :)");
});

app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/products", productRoutes);

app.use(authController.auth);

app.use("/api/v1/users", userRoutes);

app.use("/api/v1/cart", cartRoutes);

app.use("/api/v1/cart-item", cartItemRoutes);

app.use("/api/v1/orders", orderRoutes);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`app listening on port ${process.env.SERVER_PORT}`);
});
