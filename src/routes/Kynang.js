const express = require("express");
const router = express.Router();
const KynangController = require("../controller/Kynang.controller");

// Define routes for Kynang (Skills)
router.get("/", KynangController.getKynang); // Get all skills
router.post("/", KynangController.addKynang); // Add new skill
router.delete("/", KynangController.delKynang); // Delete skill by ID
router.get("/:id", KynangController.getKynangById); // Get skill by ID
router.put("/", KynangController.updateKynang); // Update skill

module.exports = router;
