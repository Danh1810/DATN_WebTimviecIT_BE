const express = require("express");
const router = express.Router();
const quyenController = require("../controller/Quyen.controller");

// Define routes and map them to controller methods
router.get("/", quyenController.getQuyen);
router.get("/dk", quyenController.getdk);
router.get("/:id", quyenController.getQuyenById);

router.post("/", quyenController.addQuyen);
router.put("/:id", quyenController.updatequyen);
router.delete("/:id", quyenController.delQuyen);

module.exports = router;
