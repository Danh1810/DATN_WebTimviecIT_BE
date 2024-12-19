const express = require("express");
const router = express.Router();
const ungtuyenController = require("../controller/Ungtuyen");
const upload = require("../middleware/multer");

// Define routes for Applications (Ung Tuyen)
router.get("/", ungtuyenController.getUT);
router.get("/ntv", ungtuyenController.getUTNTV);

router.get("/hosout", ungtuyenController.getUTlayhoso); // Get all applications
router.post("/", upload.single("file"), ungtuyenController.addUT); // Add a new application
router.delete("/", ungtuyenController.delUT);

router.get("/ok", ungtuyenController.getUTById);
router.put("/", ungtuyenController.updateUT); // Update application
router.get("/thongke", ungtuyenController.getMonthlyApplicationsStats);

module.exports = router;
