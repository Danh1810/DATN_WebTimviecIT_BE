const cloudinary = require("cloudinary").v2;
const fs = require("fs").promises; // Sử dụng phiên bản async của fs

// Cấu hình Cloudinary với các thông số chính xác
require("dotenv").config(); // Tải biến môi trường từ .env

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Middleware để upload file lên Cloudinary
const uploadToCloudinary = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded!" });
    }

    // Upload file lên Cloudinary với cấu hình
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "image", // Đảm bảo rằng file là hình ảnh
      folder: "webtimviecit", // Folder trên Cloudinary để lưu trữ hình ảnh
      transformation: [{ width: 500, height: 500, crop: "limit" }], // Resize ảnh khi tải lên
    });

    // Lưu URL của ảnh vào request để sử dụng ở bước tiếp theo
    req.fileUrl = result.secure_url;

    // Tiến hành tiếp tục request
    next();
  } catch (error) {
    // Xử lý lỗi upload
    res.status(500).json({
      error: "Upload to Cloudinary failed",
      details: error.message,
    });
  } finally {
    // Dù có lỗi hay không, xóa file tạm đã tải lên
    if (req.file && req.file.path) {
      await fs.unlink(req.file.path);
    }
  }
};

module.exports = { uploadToCloudinary };
