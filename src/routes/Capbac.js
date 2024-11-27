const express = require("express");
const router = express.Router();
const CapbacController = require("../controller/Capbac.controller"); // Use `require` for consistency

// Define routes for Capbac
router.get("/", CapbacController.getCapbac); // Get all Capbac
router.post("/", CapbacController.addCapbac); // Add new Capbac
router.get("/:id", CapbacController.getCapbacById); // Get Capbac by ID
router.put("/:id", CapbacController.updateCapbac); // Update Capbac by ID
router.delete("/:id", CapbacController.delCapbac); // Delete Capbac by ID

module.exports = router;
