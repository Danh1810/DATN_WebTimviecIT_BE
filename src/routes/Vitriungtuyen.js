const express = require("express");
const router = express.Router();
const vitriController = require("../controller/Vitrituyendung");

// Define routes for Job Positions (Vi Tri Tuyen Dung)
router.get("/", vitriController.getVtri); // Get all job positions
router.post("/", vitriController.addVtri); // Add a new job position
router.delete("/", vitriController.delVtri); // Delete a job position
router.get("/:id", vitriController.getVtriById); // Get job position by ID
router.put("/", vitriController.updateVtri); // Update a job position

module.exports = router;
