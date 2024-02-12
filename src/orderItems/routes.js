const { Router } = require("express");

const controller = require("./controller");
const authController = require("../auth/controller");

const router = Router();

router.get("/", authController.authorize, controller.getAllOrderItems);

router.get("/user", controller.getOrderItems);

router.get(
  "/:userId",
  authController.authorize,
  controller.getOrderItemsByUserId
);

router.post("/user/:orderId", controller.createOrderItemForOrderId);

router.post(
  "/:userId/:orderId",
  authController.authorize,
  controller.createOrderItemForOrderIdByUserId
);

router.delete(
  "/:orderItemId",
  authController.authorize,
  controller.deleteOrderItem
);

module.exports = router;
