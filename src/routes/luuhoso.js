const express = require("express");
const router = express.Router();
const LuuhosoController = require("../controller/luuhoso");

// Get all saved profiles
router.get("/", LuuhosoController.getSavedProfiles);

// Get a single saved profile by ID
router.get("/", LuuhosoController.getSavedProfileById);
router.get("/ntd", LuuhosoController.getSavedProfilesByEmployerId);

// Create a new saved profile
router.post("/", LuuhosoController.addSavedProfile);

// Update an existing saved profile
router.put("/", LuuhosoController.updateSavedProfile);

// Delete a saved profile
router.delete("/", LuuhosoController.deleteSavedProfile);

module.exports = router;
