const authService = require("../services/auth.service.js");
const bcrypt = require("bcryptjs");
const mysql = require("mysql2");
const crypto = require("crypto");
const db = require("../models/index.js");
const { Op } = require("sequelize");

// const register = async (req, res) => {
//   const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "123456",
//     database: "sern",
//     port: "3307",
//     dialect: "mysql",
//   });

//   const q = "SELECT * FROM Nguoidung WHERE email = ? OR username = ?";
//   db.query(q, [req.body.email, req.body.username], (err, data) => {
//     if (err) return res.status(500).json(err);
//     if (data.length) return res.status(409).json("Người dùng đã tồn tại");

//     // Hash the password and create a user
//     const salt = bcrypt.genSaltSync(10);
//     const hash = bcrypt.hashSync(req.body.password, salt);

//     // Generate a verification token
//     const token = crypto.randomBytes(20).toString("hex");

//     // Insert user into the database with verification token
//     const q =
//       "INSERT INTO Nguoidung(`username`,`email`,`password`,`verificationToken`) VALUES (?)";
//     const values = [req.body.username, req.body.email, hash, token];

//     db.query(q, [values], (err, data) => {
//       if (err) return res.status(500).json(err);

//       // Send verification email
//       const transporter = nodemailer.createTransport({
//         service: "gmail", // Use your email provider
//         auth: {
//           user: "your-email@gmail.com",
//           pass: "your-email-password", // Use environment variables for security
//         },
//       });

//       const mailOptions = {
//         from: "your-email@gmail.com",
//         to: req.body.email,
//         subject: "Email Verification",
//         text: `Please verify your email by clicking the following link: \n\n http://localhost:3000/verify/${token}`,
//       };

//       transporter.sendMail(mailOptions, (err, info) => {
//         if (err) {
//           return res.status(500).json({ message: "Failed to send email" });
//         }

//         return res
//           .status(200)
//           .json("Đăng ký thành công. Vui lòng kiểm tra email để xác nhận.");
//       });
//     });
//   });
// };

// Verification Route

const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const env = require("dotenv");
env.config();
const register = async (req, res) => {
  try {
    console.log("🚀 ~ register ~ req.body:", req.body);

    // Check if the user already exists
    const existingUser = await db.Nguoidung.findOne({
      where: { [Op.or]: [{ email: req.body.email }] },
    });
    console.log("🚀 ~ register ~ existingUser:", existingUser);

    if (existingUser) {
      return res.status(409).json({ error: "Người dùng đã tồn tại" });
    }

    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    // Generate email verification token
    const verificationToken = jwt.sign(
      { email: req.body.email },
      process.env.JWT_SECRET, // Use a secret key from your environment variables
      { expiresIn: "1h" } // Token expires in 1 hour
    );
    console.log("🚀 ~ register ~ verificationToken:", verificationToken);

    // Create a new user
    const newUser = await db.Nguoidung.create({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      MaQuyen: parseInt(req.body.MaQuyen),
      isVerified: false, // Add a field for email verification status
      verificationToken: verificationToken, // Store the verification token in the database
    });
    console.log("🚀 ~ register ~ newUser:", newUser);

    // Send verification email
    const transporter = nodemailer.createTransport({
      service: "Gmail", // Or your preferred email provider
      auth: {
        user: process.env.email, // Your email
        pass: process.env.password, // Your email password
      },
    });

    const verificationUrl = `${process.env.URL}/verify?token=${verificationToken}`;
    const mailOptions = {
      from: process.env.email,
      to: req.body.email,
      subject: "Xác minh email",
      html: `<p>Chào ${req.body.username},</p>
             <p>Vui lòng xác minh email của bạn bằng cách nhấp vào liên kết bên dưới:</p>
             <a href="${verificationUrl}">Xác minh email</a>
             <p>Liên kết này sẽ hết hạn sau 1 giờ.</p>`,
    };

    await transporter.sendMail(mailOptions);

    return res
      .status(200)
      .json({ message: "Đăng ký thành công. Kiểm tra email để xác minh." });
  } catch (error) {
    console.error("Lỗi khi xử lý đăng ký:", error);
    return res.status(500).json({ error: "Lỗi máy chủ" });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    console.log("🚀 ~ verifyEmail ~ token:", token);

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("🚀 ~ verifyEmail ~ decoded:", decoded);

    // Find the user by email
    const user = await db.Nguoidung.findOne({
      where: { email: decoded.email },
    });
    console.log("🚀 ~ verifyEmail ~ user:", user);
    console.log("🚀 ~ verifyEmail ~ user.isVerified :", user.isVerified);
    if (!user || user.isVerified == true) {
      return res
        .status(400)
        .json({ error: "Liên kết không hợp lệ hoặc đã được sử dụng" });
    }

    // Update the user's verification status
    user.isVerified = true;
    user.verificationToken = null; // Remove the token after successful verification
    await user.save();

    return res.status(200).json({ message: "Xác minh email thành công" });
  } catch (error) {
    console.error("Lỗi khi xác minh email:", error);
    return res
      .status(400)
      .json({ error: "Liên kết xác minh không hợp lệ hoặc đã hết hạn" });
  }
};

const Login = async (req, res) => {
  try {
    console.log(req.body);
    if (!req.body.email || !req.body.password) {
      return res.status(200).json({ message: "Chưa nhập giá trị", code: 2 });
    }
    if (req.body.password.length < 6) {
      return res.status(200).json({ message: "Mật khẩu  quá ngắn", code: 2 });
    }
    let data = await authService.login(req.body);
    if (data?.data?.access_token) {
      res.cookie("token", data.data.access_token, {
        httpOnly: true,
        maxAge: 3600000,
      });
      return res
        .status(data.status)
        .json({ message: data.message, code: data.code, data: data.data });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1 });
  }
};
const logout = (req, res) => {
  res.clearCookie("token");
  console.log("Đăng xuất thành công");
  return res
    .status(200)

    .json({ message: "logout success", code: 0, data: { isAuth: false } });
};

const getUserAccount = async (req, res) => {
  return res.status(200).json({
    code: 0,
    message: "ok",
    data: { isAuth: true, access_token: req.token, ...req.user },
  });
};
const forgotPassword = async (req, res) => {
  try {
    if (!req.body.email) {
      return res.status(200).json({ message: "missing value", code: 2 });
    }
    let data = await authService.forgotPassword(req.body);
    return res
      .status(data.status)
      .json({ message: data.message, code: data.code, data: {} });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1 });
  }
};

module.exports = {
  register,
  Login,
  logout,
  getUserAccount,
  forgotPassword,
  verifyEmail,
};
