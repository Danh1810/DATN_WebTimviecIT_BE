const express = require("express");
const router = express.Router();
const multer = require("multer");
const ntdController = require("../controller/NhatdController");
const uploadToCloudinary = require("../middleware/cloudinary");

// Multer configuration
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Get all records
router.get("/", ntdController.getAllNtd);

// Get record by ID
router.get("/detail", ntdController.getNtdById);
router.get("/id", ntdController.getNtdByIdNTD);

// Add new record with file upload
router.post(
  "/",
  upload.single("logo"),
  uploadToCloudinary.uploadToCloudinary,
  (req, res, next) => {
    if (req.fileUrl) {
      req.body.logo = req.fileUrl; // Attach Cloudinary URL to request body
    }
    next();
  },
  ntdController.addNtd
);

// Update record with file upload
router.put(
  "/update",
  upload.single("logo"), // multer middleware for file uploads
  async (req, res, next) => {
    try {
      if (req.file) {
        // If a file is uploaded, process it
        req.body.logo = await uploadToCloudinary(req.file.path); // Assuming this returns the URL
      }
      next(); // Proceed to the controller
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      return res.status(500).json({ error: "Failed to upload logo." });
    }
  },
  ntdController.updateNtd
);

// Delete record
router.delete("/delete", ntdController.deleteNtd);

module.exports = router;
