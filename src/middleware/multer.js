// fileUploadConfig.js
const multer = require("multer");
const path = require("path");

// Configure storage for incoming files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads"); // Save files to 'uploads' folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Generate a unique file name
  },
});

// Set up Multer with the storage configuration
const upload = multer({ storage: storage });

module.exports = upload;
