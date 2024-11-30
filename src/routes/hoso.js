const express = require("express");
const HosoController = require("../controller/Hosocontroller");
const multer = require("multer");
const uploadToCloudinary = require("../middleware/cloudinary"); // Ensure proper import style
const upload = multer({ dest: "src/uploads" });

const router = express.Router();

// Get all Hoso records
router.get("/", HosoController.getAllHoso);
router.get("/xem", HosoController.getHosoByhs);

// Get a single Hoso record by ID
router.get("/detail", HosoController.getHosoById);

// Create a new Hoso record
router.post(
  "/",
  upload.single("fileHoso"),
  uploadToCloudinary.uploadToCloudinary,
  HosoController.createHoso
);

// Update an existing Hoso record
router.put("/hoso", HosoController.updateHoso);

// Delete a Hoso record by ID
router.delete("/delete", HosoController.XoaHoso);

module.exports = router;
