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
router.put("/update", ntdController.updateNtd);
router.delete("/delete", ntdController.deleteNtd);

module.exports = router;
