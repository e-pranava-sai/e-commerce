const { Router } = require("express");

const controller = require("./controller");
const authController = require("../auth/controller");

const router = Router();

router.get("/", authController.authorize, controller.getOrders);

router.get("/user", controller.getUserOrders);

router.get("/:userId", authController.authorize, controller.getOrdersByUserId);

router.post("/user", controller.createOrder);

router.post(
  "/:userId",
  authController.authorize,
  controller.createUserOrderByUserId
);

router.delete(
  "/:orderId",
  authController.authorize,
  controller.deleteOrderByOrderId
);

module.exports = router;
