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
    console.log("🚀 ~ req.file:", req.file);
    try {
      if (req.file) {
        // Process file upload and get Cloudinary URL
        const cloudinaryResult = await uploadToCloudinary.uploadToCloudinary(
          req,
          res,
          () => {}
        );
        if (cloudinaryResult && req.fileUrl) {
          req.body.fileHoso = req.fileUrl; // Attach Cloudinary URL to request body
        }
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
router.delete("/", HosoController.XoaHoso);

module.exports = router;
