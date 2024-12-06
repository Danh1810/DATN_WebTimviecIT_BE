const express = require("express");
const router = express.Router();
const multer = require("multer");
const ntdController = require("../controller/NhatdController");
const uploadToCloudinary = require("../middleware/cloudinary"); // Ensure proper import style
const upload = multer({ dest: "src/uploads" }); // Configure multer for file uploads
router.get("/", ntdController.getAllNtd);
router.get("/detail", ntdController.getNtdById);
router.post(
  "/",
  upload.single("logo"), // multer middleware for single file upload
  uploadToCloudinary.uploadToCloudinary,
  ntdController.addNtd
);
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

router.delete("/delete", ntdController.deleteNtd);

module.exports = router;
