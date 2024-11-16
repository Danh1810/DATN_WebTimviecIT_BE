const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: "your_cloud_name",
  api_key: "your_api_key",
  api_secret: "your_api_secret",
});

// Middleware để upload file lên Cloudinary
const uploadToCloudinary = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded!" });
  }

  // Upload file lên Cloudinary
  cloudinary.uploader
    .upload(req.file.path, { resource_type: "raw" })
    .then((result) => {
      // Lưu URL vào req để sử dụng ở middleware tiếp theo hoặc controller
      req.fileUrl = result.secure_url;

      // Xóa file tạm sau khi upload
      fs.unlinkSync(req.file.path);

      next(); // Tiếp tục xử lý request
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "Upload to Cloudinary failed", details: error.message });
    });
};

module.exports = uploadToCloudinary;
