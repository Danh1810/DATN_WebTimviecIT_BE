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
    // Fetch the user from the database
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

    if (!user) {
      return {
        status: 400,
        message: "Tên đăng nhập hoặc mật khẩu không đúng",
        code: 3,
        data: {},
      };
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = bcrypt.compareSync(data.password, user.password);
    if (!isPasswordValid) {
      return {
        status: 400,
        message: "Tên đăng nhập hoặc mật khẩu không đúng",
        code: 3,
        data: {},
      };
    }

    // Construct the payload for the JWT token
    const payload = {
      email: user.email,
      username: user.username,
      Quyen: user.MaQuyen,
      TenQuyen: user.Group.ten, // Access the role name from the 'Group' association
      id: user.MaND,
    };

    const token = await JWTmdw.createToken(payload);

    // Return the success response
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
