const express = require("express");
const router = express.Router();
const NTVController = require("../controller/Ntviec.controller");

// Define routes for Nguoi Tim Viec (Job Seeker)
router.get("/", NTVController.getNTV); // Get all job seekers
router.post("/", NTVController.addNTV); // Add a new job seeker
router.delete("/", NTVController.delNTV); // Delete a job seeker
router.get("/:id", NTVController.getNtvById); // Get a job seeker by ID
router.put("/", NTVController.updateNtv); // Update job seeker info

module.exports = router;
