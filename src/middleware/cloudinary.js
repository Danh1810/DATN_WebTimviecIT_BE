const cloudinary = require("cloudinary").v2;
const { PassThrough } = require("stream");
require("dotenv").config(); // Tải biến môi trường từ .env

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
const uploadToCloudinary = async (req, res, next) => {
  console.time("UploadToCloudinary"); // Đo thời gian thực hiện

  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded!" });
    }

    // Sử dụng stream để upload trực tiếp lên Cloudinary
    const uploadStream = new Promise((resolve, reject) => {
      const passthrough = new PassThrough();

      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "image", // Đảm bảo rằng file là hình ảnh
          folder: "webtimviecit", // Folder trên Cloudinary
          transformation: [{ width: 500, height: 500, crop: "limit" }], // Resize ảnh khi tải lên
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      passthrough.pipe(stream);
      passthrough.end(req.file.buffer); // Truyền buffer vào stream
    });

    const result = await uploadStream;

    // Lưu URL của ảnh vào request để sử dụng ở bước tiếp theo
    req.fileUrl = result.secure_url;

    next(); // Tiếp tục request
  } catch (error) {
    console.error("Error during upload to Cloudinary:", error);
    res.status(500).json({
      error: "Upload to Cloudinary failed",
      details: error.message,
    });
  } finally {
    console.timeEnd("UploadToCloudinary"); // Kết thúc đo thời gian
  }
};

module.exports = { uploadToCloudinary };
