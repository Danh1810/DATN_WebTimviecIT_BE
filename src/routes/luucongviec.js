const express = require("express");
const router = express.Router();
const LuucongviecController = require("../controller/Lcvcontroller");

// Get all saved jobs
router.get("/", LuucongviecController.getSavedJobs);

// Get a single saved job by ID
router.get("/", LuucongviecController.getSavedJobById);

// Create a new saved job
router.post("/", LuucongviecController.addSavedJob);

// Update an existing saved job
router.put("/saved-jobs/:id", LuucongviecController.updateSavedJob);

// Delete a saved job
router.delete("/", LuucongviecController.deleteSavedJob);

module.exports = router;
