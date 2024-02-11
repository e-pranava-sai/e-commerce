const { Router } = require("express");

const controller = require("./controller");
const authController = require("../auth/controller");

const router = Router();

router.get("/", controller.getProducts);

router.get("/:id", controller.getProductById);

router.get("/owner/:id", controller.getProductCreatedByUserId);

router.use(authController.auth);

router.post("/", controller.createProduct);

router.delete("/:id", controller.deleteProduct);

router.put("/:id", controller.updateProduct);

module.exports = router;
