const db = require("../models/index"); // Remove .js for CommonJS
const bcrypt = require("bcryptjs");
const generator = require("generate-password");
// const sendEmail = require("./email.service"); // Uncomment if used
const JWTmdw = require("../middleware/JWT"); // Remove .js for CommonJS

const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
  let hashPassword = bcrypt.hashSync(password, salt);
  return hashPassword;
};

const register = async (data) => {
  try {
    const user = await db.Users.create(
      data.map((item) => ({ ...item, password: hashPassword(item.password) }))
    );
    if (user) {
      return { status: 200, message: "Đăng ký thành công", code: 0, data: {} };
    }
  } catch (error) {
    return { status: 500, message: "", code: -1, data: {} };
  }
};

const checkPassword = (plainPassword, hashedPassword) => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};

const login = async (data) => {
  try {
    const user = await db.Nguoidung.findOne({
      where: { email: data.email },
      include: [
        {
          model: db.Quyen,
          as: "Group",
        },
      ],
      raw: true,
      nest: true,
    });
    console.log("🚀 ~ login ~ user:", user);

    // Check if user exists
    if (!user) {
      return {
        status: 400,
        message: "Thông tin đăng nhập không chính xác",
        code: 3,
        data: {},
      };
    }

    // Check email verification status
    if (user.isVerified === 0) {
      return {
        status: 403,
        message: "Email chưa được xác thực",
        code: 4,
        data: {},
      };
    }

    // Check user's active status
    if (user.Trangthai !== "Hoạt động") {
      return {
        status: 403,
        message: "Tài khoản đã bị khóa hoặc không hoạt động",
        code: 5,
        data: {},
      };
    }

    // Validate password
    let isPasswordValid = false;
    try {
      isPasswordValid = bcrypt.compareSync(data.password, user.password);
      console.log("🚀 ~ login ~ isPasswordValid:", isPasswordValid);
    } catch (err) {
      console.error("Password comparison error:", err);
      return {
        status: 500,
        message: "Lỗi xử lý mật khẩu",
        code: -1,
        data: {},
      };
    }

    // Check password validity
    if (!isPasswordValid) {
      return {
        status: 400,
        message: "Thông tin đăng nhập không chính xác",
        code: 3,
        data: {},
      };
    }

    // Prepare payload for token
    const payload = {
      email: user.email,
      username: user.username,
      Quyen: user.MaQuyen,
      TenQuyen: user.Group.ten,
      id: user.id,
    };

    // Create token
    let token;
    try {
      token = await JWTmdw.createToken(payload);
    } catch (err) {
      console.error("Token creation error:", err);
      return {
        status: 500,
        message: "Lỗi tạo token",
        code: -1,
        data: {},
      };
    }

    // Successful login response
    return {
      status: 200,
      message: "Đăng nhập thành công",
      code: 0,
      data: {
        email: user.email,
        username: user.username,
        MaND: user.MaND,
        access_token: token,
        Quyen: user.MaQuyen,
        TenQuyen: user.Group.ten,
        ten: user.username,
        userid: user.id,
      },
    };
  } catch (error) {
    console.error("Server Error:", error);
    return {
      status: 500,
      message: "Lỗi đăng nhập",
      code: -1,
      data: {},
    };
  }
};

module.exports = { register, login, hashPassword };
