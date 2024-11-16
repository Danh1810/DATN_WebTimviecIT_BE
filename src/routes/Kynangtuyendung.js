const express = require("express");
const router = express.Router();
const KnTTController = require("../controller/Kynangtuyendung");

// Define routes for KnTT (Recruitment Skills)
router.get("/", KnTTController.getKnTT); // Get all recruitment skills
router.post("/", KnTTController.addKnTT); // Add new recruitment skill
router.delete("/", KnTTController.delKnTT); // Delete recruitment skill by ID
router.get("/group", KnTTController.getKnTTByGroup); // Get recruitment skills by group ID
router.get("/role/:id", KnTTController.getRoleById); // Get role by ID
router.put("/", KnTTController.updateKntt); // Update recruitment skill

module.exports = router;
