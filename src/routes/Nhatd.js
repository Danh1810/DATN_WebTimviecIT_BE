const express = require("express");
const router = express.Router();
const ntdController = require("../controller/NhatdController");

router.get("/", ntdController.getAllNtd);
router.get("/:id", ntdController.getNtdById);
router.post("/add", ntdController.addNtd);
router.put("/update", ntdController.updateNtd);
router.delete("/delete", ntdController.deleteNtd);

module.exports = router;
