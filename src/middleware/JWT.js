const jwt = require("jsonwebtoken");
const env = require("dotenv");
const JWTService = require("../services/JWT.service"); // Remove .js extension for CommonJS

env.config();
const nonSecurePaths = [
  "/login",
  "/logout",
  // "/test",
  "/register",
  "/jb",
  "/sea",
  // "/reset-password",
  // "/news/getnewsbysort",
  // "/payment/callback",
  // "/forgotPassword",
];
const createToken = (data) => {
  try {
    const token = jwt.sign(data, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1h", // Fallback to 1 hour if not set
    });

    // Log token creation success if needed (ensure this is secure in production)
    console.debug("Token created successfully");

    return token;
  } catch (error) {
    // Handle specific JWT errors if necessary
    console.error("Error creating token:", error.message);
    throw new Error("Unable to create token"); // Optionally rethrow or handle the error
  }
};
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return { expired: true, message: "Token has expired" };
    }
    return { invalid: true, message: "Token is invalid" };
  }
};
function extractToken(req) {
  if (req) {
    return req.split(" ")[1];
  } else {
    return null;
  }
}
const checkUserJWT = (req, res, next) => {
  if (nonSecurePaths.includes(req.path)) {
    return next();
  }

  const token =
    req.cookies.token ||
    req.headers["x-access-token"] ||
    extractToken(req.headers["authorization"]) ||
    req.headers["token"] ||
    req.query.token ||
    req.body.token ||
    req.params.token;
  console.log(token);

  if (!token) {
    console.log("No token provided!", req.path);
    return res.status(200).json({
      message: "No token provided!",
      code: 1,
      data: { isAuth: false },
    });
  }

  const decoded = verifyToken(token);
  if (decoded.expired) {
    return res.status(401).json({
      message: "Token has expired!",
      code: 2,
      data: { isAuth: false },
    });
  }

  if (decoded.invalid) {
    return res.status(401).json({
      message: "Unauthorized!",
      code: 1,
      data: { isAuth: false },
    });
  }

  req.user = decoded;
  req.token = token;
  next();
};
const checkUserPermission = async (req, res, next) => {
  if (nonSecurePaths.includes(req.path) || req.path == "/account") {
    return next();
  }
  if (req.user) {
    let group_id = req.user.Quyen_id;
    console.log("user", req.user);
    console.log("path", req.path);

    let currentUrl = req.path;
    let roles = await JWTService.getRolesByGroupId(group_id);
    console.log(roles);

    if (roles.data.length > 0) {
      let checkPermission = roles.data.some((item) => {
        console.log("item", item.URL);
        return Array.isArray(item.URL)
          ? item.URL.includes(currentUrl)
          : item.URL === currentUrl;
      });
      console.log("dhsadh", checkPermission);
      if (checkPermission === true) {
        next();
      } else {
        return res
          .status(401)
          .send({ message: "Bạn không có quyền ", code: 1, data: [] });
      }
    } else {
      return res
        .status(401)
        .send({ message: "Bạn không có quyền", code: 1, data: [] });
    }
  } else {
    return res
      .status(401)
      .send({ message: "Unauthorizede!", code: 1, data: [] });
  }
};

module.exports = {
  createToken,
  verifyToken,
  checkUserJWT,
  checkUserPermission,
};
