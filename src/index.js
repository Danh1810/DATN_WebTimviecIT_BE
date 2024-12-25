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
const setupExpirationCronJob = require("./config/cron");
setupExpirationCronJob();
// Middleware configuration
app.use(express.json());
app.use(bodyParser.json()); // Handles JSON payloads.
app.use(bodyParser.urlencoded({ extended: true })); // For handling form-encoded data.
app.use(cookieParser()); // Parse cookies for authentication/other purposes.
const allowedOrigins = [
  // "http://localhost:3000", // Development
  // "https://datn-web-timviec-it-fe.vercel.app",
  "https://vieclamit.site",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g., mobile apps, Postman) or valid origins
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error(`Blocked by CORS: ${origin}`); // Log for debugging
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Required for cookies and Authorization headers
  })
);

// Handle preflight requests explicitly
app.options("*", cors());

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
