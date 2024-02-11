const { Router } = require("express");

const controller = require("./controller");
const authController = require("../auth/controller");

const router = Router();

router.get("/", authController.authorize, controller.getOrders);

router.get(
  "/user/:userId",
  authController.authorize,
  controller.getOrdersByUserId
);

router.post("/", authController.authorize, controller.createOrder);

router.delete("/:orderId", authController.authorize, controller.deleteOrder);

router.get("/user", controller.getUserOrders);

router.post("/user", controller.createUserOrder);

router.delete("/user/:orderId", controller.deleteUserOrder);

module.exports = router;
