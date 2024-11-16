const express = require("express");
const router = express.Router();
const phongvanController = require("../controller/Phongvan");

// Define routes for Phong Van (Interview)
router.get("/", phongvanController.getPhongvan); // Get all interviews
router.post("/", phongvanController.addPv); // Add a new interview
router.delete("/", phongvanController.delpv); // Delete an interview
router.get("/:id", phongvanController.getPvById); // Get an interview by ID
router.put("/", phongvanController.updatePv); // Update interview info

module.exports = router;
