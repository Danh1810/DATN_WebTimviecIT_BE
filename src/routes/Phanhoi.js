const express = require("express");
const router = express.Router();
const phanHoiController = require("../controller/Phanhoi");
const multer = require("multer");
const { uploadToCloudinary } = require("../middleware/cloudinary");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});
// Lấy tất cả phản hồi
router.get("/", phanHoiController.getAllPhanHoi);

// Lấy phản hồi theo ứng tuyển (idUngTuyen)
router.get("/phut", phanHoiController.getPhanHoiByUngTuyen);

// Lấy phản hồi theo ID
router.get("/detail", phanHoiController.getPhanHoiById);

// Tạo phản hồi mới
router.post(
  "/",
  upload.single("filedinhkem"),
  uploadToCloudinary,
  phanHoiController.createPhanHoi
);

// Cập nhật phản hồi
router.put("/", phanHoiController.updatePhanHoi);

// Xóa phản hồi
router.delete("/", phanHoiController.deletePhanHoi);

module.exports = router;
