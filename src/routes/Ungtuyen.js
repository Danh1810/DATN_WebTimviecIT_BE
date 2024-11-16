const express = require("express");
const router = express.Router();
const ungtuyenController = require("../controller/Ungtuyen");
const upload = require("../middleware/multer");

// Define routes for Applications (Ung Tuyen)
router.get("/", ungtuyenController.getUT); // Get all applications
router.post("/", upload.single("file"), ungtuyenController.addUT); // Add a new application
router.delete("/", ungtuyenController.delUT); // Delete an application
router.get("/:id", ungtuyenController.getUTById); // Get application by ID
router.put("/", ungtuyenController.updateUT); // Update application

module.exports = router;
