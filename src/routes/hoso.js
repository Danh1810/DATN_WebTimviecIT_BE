const express = require("express");
const HosoController = require("../controller/Hosocontroller");
const multer = require("multer");
const { uploadToCloudinary } = require("../middleware/cloudinary");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

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
  uploadToCloudinary,
  HosoController.createHoso
);

// Update an existing Hoso record
router.put(
  "/update",
  upload.single("fileHoso"), // multer middleware for file uploads
  uploadToCloudinary, // Cloudinary upload middleware
  (req, res, next) => {
    try {
      // If a file was uploaded and Cloudinary processed it, attach the URL to req.body
      if (req.fileUrl) {
        req.body.fileHoso = req.fileUrl;
      }
      next(); // Proceed to the controller only if file handling was successful
    } catch (error) {
      console.error("Error attaching Cloudinary URL:", error);
      return res.status(500).json({ error: "Failed to process file upload." });
    }
  },
  HosoController.updateHoso
);

router.put("/tt", HosoController.updatettHoso);
router.delete("/", HosoController.XoaHoso);

module.exports = router;
