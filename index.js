const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, ".env"),
  override: true,
});
const express = require("express");

const userRoutes = require("./src/users/routes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to e-commerce API :)");
});

app.use("/api/v1/users", userRoutes);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`app listening on port ${process.env.SERVER_PORT}`);
});
