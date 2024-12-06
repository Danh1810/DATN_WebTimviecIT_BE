const express = require("express");
const router = express.Router();
const multer = require("multer");
const NTVController = require("../controller/Ntviec.controller");
const uploadToCloudinary = require("../middleware/cloudinary"); // Ensure proper import style
const upload = multer({ dest: "src/uploads" }); // Configure multer for file uploads

router.get("/", NTVController.getNTV);
router.get("/hoso", NTVController.getNTVhoso);
router.get("/lcv", NTVController.getNTVhosolcv);

// Add a new job seeker with file upload and cloudinary integration
router.post(
  "/",
  upload.single("anhDaiDien"),
  uploadToCloudinary.uploadToCloudinary,
  NTVController.addNTV
);

router.delete("/", NTVController.delNTV);
router.get("/detail", NTVController.getNtvById);
router.put(
  "/update",
  upload.single("anhDaiDien"), // multer middleware for file uploads
  async (req, res, next) => {
    try {
      if (req.file) {
        // If a file is uploaded, process it
        req.body.anhDaiDien = await uploadToCloudinary(req.file.path); // Assuming this returns the URL
      }
      next(); // Proceed to the controller
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      return res.status(500).json({ error: "Failed to upload logo." });
    }
  },
  NTVController.updateNtv
);

module.exports = router;
