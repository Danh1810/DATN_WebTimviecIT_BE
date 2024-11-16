const express = require("express");
const router = express.Router();
const tintdController = require("../controller/TintdController");

// Route to get all job posts
// router.get("/", tintdController.getAllTintd);

// Route to get a job post by ID
router.get("/:id", tintdController.getTintdByID);

// Route to get TTD data
router.get("/", tintdController.getAllTintd);

// Route to add a new TTD
router.post("/", tintdController.addTtd);

// Route to delete a TTD by ID
router.delete("/delete", tintdController.delTtd);

// Route to get TTD by ID
router.get("/details/:id", tintdController.getTtdById);

// Route to update a TTD
router.put("/update", tintdController.updateTtd);

module.exports = router;