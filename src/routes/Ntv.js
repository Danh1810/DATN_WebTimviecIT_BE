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
router.put("/", NTVController.updateNtv);

module.exports = router;
