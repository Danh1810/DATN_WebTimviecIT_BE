const express = require("express");
const router = express.Router();
const multer = require("multer");
const ntdController = require("../controller/NhatdController");
const uploadToCloudinary = require("../middleware/cloudinary");

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Get all records
router.get("/", ntdController.getAllNtd);

// Get record by ID
router.get("/detail", ntdController.getNtdById);

// Add new record with file upload
router.post(
  "/",
  upload.single("logo"), // Multer middleware for single file upload
  uploadToCloudinary.uploadToCloudinary, // Cloudinary middleware
  ntdController.addNtd
);

// Update record with file upload
router.put(
  "/update",
  upload.single("logo"), // Multer middleware for file uploads
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
          req.body.logo = req.fileUrl; // Attach Cloudinary URL to request body
        }
      }
      next(); // Proceed to the controller
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      return res.status(500).json({ error: "Failed to upload logo." });
    }
  },
  ntdController.updateNtd // Handle the update logic
);

// Delete record
router.delete("/delete", ntdController.deleteNtd);

module.exports = router;
