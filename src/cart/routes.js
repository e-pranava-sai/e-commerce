const { Router } = require("express");

const controller = require("./controller");
const authController = require("../auth/controller");

const router = Router();

router.get("/", authController.authorize, controller.getCarts);

router.get("/user", controller.getCart);

router.get("/:userId", authController.authorize, controller.getCartByUserId);

router.post("/user", controller.createCart);

router.post(
  "/:userId",
  authController.authorize,
  controller.createCartByUserId
);

router.delete("/:userId", authController.authorize, controller.deleteCart);

module.exports = router;
