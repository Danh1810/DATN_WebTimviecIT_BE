const express = require("express");
const router = express.Router();
const multer = require("multer");
const NTVController = require("../controller/Ntviec.controller");
const uploadToCloudinary = require("../middleware/cloudinary"); // Ensure proper import style
const upload = multer({ dest: "src/uploads" }); // Configure multer for file uploads

// Define routes for Nguoi Tim Viec (Job Seeker)
router.get("/", NTVController.getNTV); // Get all job seekers

// Add a new job seeker with file upload and cloudinary integration
router.post(
  "/",
  upload.single("anhDaiDien"), // multer middleware for single file upload
  uploadToCloudinary.uploadToCloudinary, // Custom middleware to upload to Cloudinary
  NTVController.addNTV // Controller to handle the request
);

router.delete("/", NTVController.delNTV); // Delete a job seeker
router.get("/:id", NTVController.getNtvById); // Get a job seeker by ID
router.put("/", NTVController.updateNtv); // Update job seeker info

module.exports = router;
