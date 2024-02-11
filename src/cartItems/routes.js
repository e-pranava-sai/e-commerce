const { Router } = require("express");

const controller = require("./controller");
const authController = require("../auth/controller");

const router = Router();

router.get("/", authController.authorize, controller.getAllCartItems);

router.get("/user", controller.getCartItems);

router.get(
  "/:userId",
  authController.authorize,
  controller.getCartItemsByUserId
);

router.post("/user", controller.createCartItem);

router.put("/:cartItemId", controller.updateCartItem);

router.delete("/user/:cartItemId", controller.deleteCartItem);

module.exports = router;
