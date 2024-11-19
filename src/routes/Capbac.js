const express = require("express");
const router = express.Router();
import CapbacController from "../controller/Capbac.controller";

// Define routes for Capbac
router.get("/", CapbacController.getCapbac); // Get all Capbac
router.post("/", CapbacController.addCapbac); // Add new Capbac
router.delete("/", CapbacController.delCapbac); // Delete Capbac by ID
router.get("/:id", CapbacController.getCapbacById); // Get Capbac by ID
router.put("/", CapbacController.updateCapbac); // Update Capbac

module.exports = router;
