const authService = require("../services/auth.service.js");
const bcrypt = require("bcryptjs");
const mysql = require("mysql");
const test = async (req, res) => {
  return res.json({ message: "hello world", data: "test" });
};
const register = async (req, res) => {
  const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "sern",
    port: "3307",
    dialect: "mysql",
  });
  const q = "SELECT * FROM Nguoidung WHERE email = ? OR username = ?";

  db.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("Người dùng đã tồn tại");

    //Hash the password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const q =
      "INSERT INTO Nguoidung(`username`,`email`,`password','MaQuyen`) VALUES (?)";
    const values = [req.body.username, req.body.email, hash];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Đăng ký thanh công");
    });
  });
};

const Login = async (req, res) => {
  try {
    console.log(req.body);
    if (!req.body.username || !req.body.password) {
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
  test,
  register,
  Login,
  logout,
  getUserAccount,
  forgotPassword,
};
