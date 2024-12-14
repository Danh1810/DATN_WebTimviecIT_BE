const authService = require("../services/auth.service.js");
const bcrypt = require("bcryptjs");
const mysql = require("mysql2");
const crypto = require("crypto");
const db = require("../models/index.js");
const { Op } = require("sequelize");
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
      MaQuyen: 3,
      isVerified: false, // Add a field for email verification status
      verificationToken: verificationToken, // Store the verification token in the database
    });

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
const registerNTD = async (req, res) => {
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
      MaQuyen: 2,
      isVerified: false, // Add a field for email verification status
      verificationToken: verificationToken, // Store the verification token in the database
    });
    const employer = await db.Nhatuyendung.create({
      ten: req.body.ten,
      email: req.body.emailNTD,
      sdt: req.body.sdt,
      linhvuc: req.body.linhvuc,
      website: req.body.website,
      diachi: req.body.diachi,
      MaND: newUser.id,
    });

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
// const Login = async (req, res) => {
//   try {
//     console.log(req.body);
//     if (!req.body.email || !req.body.password) {
//       return res.status(200).json({ message: "Chưa nhập giá trị", code: 2 });
//     }
//     if (req.body.password.length < 6) {
//       return res.status(200).json({ message: "Mật khẩu  quá ngắn", code: 2 });
//     }
//     let data = await authService.login(req.body);
//     if (data?.data?.access_token) {
//       res.cookie("token", data.data.access_token, {
//         httpOnly: true,
//         maxAge: 3600000,
//       });
//       return res
//         .status(data.status)
//         .json({ message: data.message, code: data.code, data: data.data });
//     }
//   } catch (error) {
//     return res.status(500).json({ message: error.message, code: -1 });
//   }
// };

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Vui lòng nhập email và mật khẩu",
        code: 2,
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Định dạng email không hợp lệ",
        code: 2,
      });
    }

    // Validate password length and complexity
    if (password.length < 6) {
      return res.status(400).json({
        message: "Mật khẩu phải có ít nhất 6 ký tự",
        code: 2,
      });
    }

    // Attempt login through auth service
    const loginResult = await authService.login({ email, password });
    console.log("🚀 ~ Login ~ loginResult:", loginResult);

    // Detailed login result handling
    // switch (loginResult.code) {
    //   case 0: // Successful login
    //     break;
    //   case 3: // Invalid credentials
    //     return res.status(400).json({
    //       message: "Thông tin đăng nhập không chính xác",
    //       code: 3,
    //     });
    //   case 4: // Email not verified
    //     return res.status(403).json({
    //       message: "Vui lòng xác thực email trước khi đăng nhập",
    //       code: 4,
    //     });
    //   case 5: // Account blocked or inactive
    //     return res.status(403).json({
    //       message: "Tài khoản của bạn đã bị khóa",
    //       code: 5,
    //     });
    //   default: // Other errors
    //     return res.status(500).json({
    //       message: "Đã xảy ra lỗi trong quá trình đăng nhập",
    //       code: -1,
    //     });
    // }

    // Ensure login result has required data
    // if (!loginResult.data || !loginResult.data.access_token) {
    //   return res.status(500).json({
    //     message: "Không thể tạo phiên đăng nhập",
    //     code: -1,
    //   });
    // }

    // Set HTTP-only cookie with access token
    res.cookie("token", loginResult.data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure in production
      sameSite: "strict",
      maxAge: 3600000, // 1 hour
      path: "/", // Ensure cookie is accessible across the site
      // Optional: add domain if needed
      // domain: process.env.COOKIE_DOMAIN,
    });

    // Successful login response
    return res.status(200).json({
      message: loginResult.message || "Đăng nhập thành công",
      code: 0,
      data: loginResult.data,
    });
  } catch (error) {
    // Centralized error handling with more detailed logging
    console.error("Login Error Details:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });

    // Differentiate between known and unknown errors
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: error.message,
        code: 2,
      });
    }

    return res.status(500).json({
      message: "Đã xảy ra lỗi không mong muốn. Vui lòng thử lại sau",
      code: -1,
    });
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
  registerNTD,
};
