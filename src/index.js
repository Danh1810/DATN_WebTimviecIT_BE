const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const initApiRoutes = require("./routes/index");
const path = require("path");
require("./passport"); // Ensure passport is correctly configured.
dotenv.config(); // Use dotenv for environment variables.

const app = express();
const { sequelize } = require("./models/index");

// Middleware configuration
app.use(express.json());
app.use(bodyParser.json()); // Handles JSON payloads.
app.use(bodyParser.urlencoded({ extended: true })); // For handling form-encoded data.
app.use(cookieParser()); // Parse cookies for authentication/other purposes.
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from your frontend
    methods: ["GET", "POST", "PUT", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // This is required for cookies and Authorization headers
  })
);

// Serve static files (e.g., uploads)
app.use("/uploads", express.static(path.join(__dirname, "src/uploads")));

// Initialize API routes
initApiRoutes(app);

// Error handling middleware (after routes)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Port configuration
const port = process.env.PORT || 8080;

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// Optional: Ensure Sequelize connects properly to the database
sequelize
  .authenticate()
  .then(() => console.log("Database connected successfully."))
  .catch((err) => console.error("Unable to connect to the database:", err));
