const express = require("express");
const router = express.Router();
const multer = require("multer");
const ntdController = require("../controller/NhatdController");
const { uploadToCloudinary } = require("../middleware/cloudinary");

// Multer configuration: Memory storage for buffer upload
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Get all records
router.get("/", ntdController.getAllNtd);

// Get record by ID
router.get("/detail", ntdController.getNtdById);
router.get("/id", ntdController.getNtdByIdNTD);

router.get("/tk", ntdController.getAllNtdtk);
router.get("/tkiem", ntdController.searchJNTDByKeyword);

router.post(
  "/",
  upload.single("logo"),
  uploadToCloudinary, // Cloudinary upload middleware
  (req, res, next) => {
    if (req.fileUrl) {
      req.body.logo = req.fileUrl; // Attach Cloudinary URL to request body
    }
    next();
  },
  ntdController.addNtd
);

router.put(
  "/update",
  upload.single("logo"), // Multer middleware for file uploads
  uploadToCloudinary, // Cloudinary upload middleware
  (req, res, next) => {
    try {
      // If a file was uploaded and Cloudinary processed it, attach the URL to req.body
      if (req.fileUrl) {
        req.body.logo = req.fileUrl;
      }
      next(); // Proceed to the controller only if file handling was successful
    } catch (error) {
      console.error("Error attaching Cloudinary URL:", error);
      return res.status(500).json({ error: "Failed to process file upload." });
    }
  },
  ntdController.updateNtd // Proceed to the controller after file handling
);

// Update "trangthai" (status) service
router.post("/duyet", ntdController.updateTrangthaiService);

// Delete record
router.delete("/", ntdController.deleteNtd);
router.get("/countbylinhvuc", ntdController.getCountEmployersByField);

module.exports = router;
