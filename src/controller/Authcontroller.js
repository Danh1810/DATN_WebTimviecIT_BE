const authService = require("../services/auth.service.js");
const bcrypt = require("bcryptjs");
const mysql = require("mysql2");
const nodemailer = require("nodemailer");
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

const register = async (req, res) => {
  try {
    // Log input data
    console.log("🚀 ~ register ~ req.body:", req.body);

    // Check if the user already exists
    const existingUser = await db.Nguoidung.findOne({
      where: {
        [Op.or]: [{ email: req.body.email }, { username: req.body.username }],
      },
    });

    if (existingUser) {
      return res.status(409).json({ error: "Người dùng đã tồn tại" });
    }

    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    // Create a new user
    const newUser = await db.Nguoidung.create({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      MaQuyen: parseInt(req.body.MaQuyen),
    });

    return res
      .status(200)
      .json({ message: "Đăng ký thành công", user: newUser });
  } catch (error) {
    console.error("Lỗi khi xử lý đăng ký:", error);
    return res.status(500).json({ error: "Lỗi máy chủ" });
  }
};

// const verifyEmail = (req, res) => {
//   const { token } = req.params;

//   const q = "SELECT * FROM Nguoidung WHERE verificationToken = ?";
//   db.query(q, [token], (err, data) => {
//     if (err) return res.status(500).json(err);
//     if (!data.length) return res.status(404).json("Invalid verification token");

//     // Mark user as verified
//     const qUpdate =
//       "UPDATE Nguoidung SET verified = true WHERE verificationToken = ?";
//     db.query(qUpdate, [token], (err, data) => {
//       if (err) return res.status(500).json(err);
//       return res.status(200).json("Email đã được xác nhận thành công.");
//     });
//   });
// };

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
};
