const express = require("express");
const router = express.Router();
const multer = require("multer");
const NTVController = require("../controller/Ntviec.controller");
const { uploadToCloudinary } = require("../middleware/cloudinary"); // Ensure proper import style
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
}); // Configure multer for file uploads

router.get("/", NTVController.getNTV);
router.get("/hoso", NTVController.getNTVhoso);
router.get("/lcv", NTVController.getNTVhosolcv);

// Add a new job seeker with file upload and cloudinary integration
router.post(
  "/",
  upload.single("anhDaiDien"),
  uploadToCloudinary,
  NTVController.addNTV
);

router.delete("/", NTVController.delNTV);
router.get("/detail", NTVController.getNtvById);
router.put(
  "/update",
  upload.single("anhDaiDien"), // multer middleware for file uploads
  uploadToCloudinary, // Cloudinary upload middleware
  (req, res, next) => {
    try {
      // If a file was uploaded and Cloudinary processed it, attach the URL to req.body
      if (req.fileUrl) {
        req.body.anhDaiDien = req.fileUrl;
      }
      next(); // Proceed to the controller only if file handling was successful
    } catch (error) {
      console.error("Error attaching Cloudinary URL:", error);
      return res.status(500).json({ error: "Failed to process file upload." });
    }
  },
  NTVController.updateNtv
);

module.exports = router;
