const cloudinary = require("cloudinary").v2;
const stream = require("stream");
require("dotenv").config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadToCloudinary = async (req, res, next) => {
  try {
    console.log("🚀 ~ uploadToCloudinary ~ req.file:", req.file);

    if (!req.file) {
      // return res.status(400).json({ error: "No file uploaded!" });
      return next();
    }

    // Use buffer from memoryStorage and upload to Cloudinary
    const bufferStream = new stream.PassThrough();
    bufferStream.end(req.file.buffer);

    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" }, // Automatically detect file type
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return res.status(500).json({
            error: "Upload to Cloudinary failed",
            details: error.message,
          });
        }

        // Attach the uploaded file URL to the request object
        req.fileUrl = result.secure_url;
        console.log(
          "🚀 ~ uploadToCloudinary ~ result.secure_url;:",
          result.secure_url
        );

        // Continue to the next middleware
        next();
      }
    );

    // Pipe the buffer into the upload stream
    bufferStream.pipe(uploadStream);
  } catch (error) {
    console.error("Unexpected error during upload:", error);
    res.status(500).json({
      error: "Unexpected error during upload",
      details: error.message,
    });
  }
};

module.exports = { uploadToCloudinary };
