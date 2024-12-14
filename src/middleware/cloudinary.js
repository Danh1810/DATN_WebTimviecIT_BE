const cloudinary = require("cloudinary").v2;
const fs = require("fs").promises;
require("dotenv").config(); // Load environment variables

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// const uploadToCloudinary = async (req, res, next) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: "No file uploaded!" });
//     }

//     // Upload file to Cloudinary
//     const result = await cloudinary.uploader.upload(req.file.path, {
//       resource_type: "auto", // Automatically detect the file type
//     });

//     // Attach the uploaded file URL to the request object
//     req.fileUrl = result.secure_url;

//     // Continue to the next middleware or controller
//     next();
//   } catch (error) {
//     console.error("Error uploading to Cloudinary:", error);
//     res.status(500).json({
//       error: "Upload to Cloudinary failed",
//       details: error.message,
//     });
//   } finally {
//     // Delete the temporary file whether upload succeeds or fails
//     if (req.file && req.file.path) {
//       try {
//         await fs.unlink(req.file.path);
//         console.log("Temporary file deleted:", req.file.path);
//       } catch (unlinkError) {
//         console.error("Error deleting temporary file:", unlinkError);
//       }
//     }
//   }
// };
const uploadToCloudinary = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded!" });
    }

    // Use buffer from memoryStorage
    const result = await cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      (error, uploadResult) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return res.status(500).json({
            error: "Upload to Cloudinary failed",
            details: error.message,
          });
        }
        req.fileUrl = uploadResult.secure_url;
        next();
      }
    );

    // Pipe the buffer to Cloudinary's upload stream
    const stream = require("stream");
    const bufferStream = new stream.PassThrough();
    bufferStream.end(req.file.buffer);
    bufferStream.pipe(result);
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({
      error: "Unexpected error during upload",
      details: error.message,
    });
  }
};

module.exports = { uploadToCloudinary };

module.exports = { uploadToCloudinary };
