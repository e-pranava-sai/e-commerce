const redis = require("redis");

const client = redis.createClient(process.env.REDIS_PORT);

const getProducts = async (req, res, next) => {
  if (!client.isOpen) {
    await client.connect();
  }
  const products = await client.get("products");
  if (products !== null && products.length !== 0) {
    res.status(200).json(JSON.parse(products));
  } else {
    next();
  }
};

module.exports = { getProducts, client };
