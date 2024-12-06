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
router.put(
  "/update",
  upload.single("fileHoso"), // multer middleware for file uploads
  async (req, res, next) => {
    try {
      if (req.file) {
        // If a file is uploaded, process it
        req.body.fileHoso = await uploadToCloudinary(req.file.path); // Assuming this returns the URL
      }
      next(); // Proceed to the controller
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      return res.status(500).json({ error: "Failed to upload logo." });
    }
  },
  HosoController.updateHoso
);

// Delete a Hoso record by ID
router.delete("/delete", HosoController.XoaHoso);

module.exports = router;
