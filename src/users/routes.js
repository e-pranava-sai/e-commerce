const { Router } = require("express");

const controller = require("./controller");
const authController = require("../auth/controller");

const router = Router();

router.get("/", controller.getUsers);

router.get("/:id", controller.getUserById);

router.post("/", authController.authorize, controller.createUser);

router.delete("/:id", authController.authorize, controller.deleteUser);

router.put("/:id", controller.updateUser);

module.exports = router;
