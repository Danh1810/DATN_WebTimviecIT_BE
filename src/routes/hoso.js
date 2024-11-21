const express = require("express");
const HosoController = require("../controller/Hosocontroller");

const router = express.Router();

// Get all Hoso records
router.get("/h", HosoController.getAllHoso);

// Get a single Hoso record by ID
router.get("/detail", HosoController.getHosoById);

// Create a new Hoso record
router.post("/", HosoController.createHoso);

// Update an existing Hoso record
router.put("/hoso", HosoController.updateHoso);

// Delete a Hoso record by ID
router.delete("/delete", HosoController.XoaHoso);

module.exports = router;
