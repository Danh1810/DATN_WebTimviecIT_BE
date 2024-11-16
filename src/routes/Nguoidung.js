const express = require("express");
const router = express.Router();
const userController = require("../controller/Nguoidung.controller");

// Define routes and map them to controller methods
router.get("/", userController.getnguoidung);
router.get("/:id", userController.getnguoidungById);
router.post("/", userController.addnguoidung);
router.put("/:id", userController.updateND);
router.delete("/:id", userController.delnguoidung);

module.exports = router;
