const nguoidungService = require("../services/nguoidung.service");
const db = require("../models/index");
const bcrypt = require("bcryptjs");
const getnguoidung = async (req, res) => {
  try {
    const data = await nguoidungService.getAllNguoidung();
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};

const addnguoidung = async (req, res) => {
  try {
    const { email, password, username, MaQuyen } = req.body;

    // Kiểm tra nếu không có password
    if (!password) {
      return res
        .status(400)
        .json({ message: "Password is required.", code: -1, data: "" });
    }

    // Mã hóa mật khẩu với bcrypt
    const saltRounds = 10; // Độ phức tạp của mã hóa
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Tạo user với mật khẩu đã mã hóa
    const data = await nguoidungService.createNguoidung({
      email,
      password: hashedPassword, // Lưu mật khẩu mã hóa
      username,
      MaQuyen,
    });

    // Phản hồi
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    // Xử lý lỗi
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};

const delnguoidung = async (req, res) => {
  try {
    const data = await nguoidungService.xoanguoidung(req.query.id);
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const hashPasswords = async () => {
  try {
    // Lấy tất cả người dùng trong bảng
    const users = await db.Nguoidung.findAll();

    // Duyệt qua tất cả người dùng và kiểm tra mật khẩu
    for (let user of users) {
      // Kiểm tra nếu mật khẩu chưa được hash (Giả sử mật khẩu chưa hash có độ dài ngắn hơn 60 ký tự)
      if (user.password && user.password.length < 60) {
        // Hash mật khẩu chưa được hash
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(user.password, salt);

        // Cập nhật lại mật khẩu đã hash vào cơ sở dữ liệu
        await user.update({ password: hashedPassword });
        console.log(`Mật khẩu của người dùng ${user.username} đã được mã hóa.`);
      }
    }

    console.log("Hoàn tất kiểm tra và cập nhật mật khẩu.");
  } catch (error) {
    console.error("Lỗi khi kiểm tra và cập nhật mật khẩu:", error);
  }
};
const getnguoidungById = async (req, res) => {
  try {
    const data = await nguoidungService.getNguoidungById(req.query.id);
    return res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {}
};
const getNguoidungByUsername = async (req, res) => {
  try {
    const username = req.body.username;
    const data = await nguoidungService.getNguoidungByUsername(username);
    return res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {}
};
const updateND = async (req, res) => {
  try {
    const { id, email, password, username, MaQuyen } = req.body;
    console.log("🚀 ~ updateND ~ req.body:", req.body);

    // Validate required fields (example)
    if (!email || !username || !MaQuyen) {
      return res
        .status(400)
        .json({ message: "Missing required fields.", code: -1 });
    }

    // Optional: Hash the password if provided
    let hashedPassword;
    if (password) {
      const saltRounds = 10; // Complexity of hashing
      hashedPassword = await bcrypt.hash(password, saltRounds);
      console.log("🚀 ~ updateND ~ hashedPassword:", hashedPassword);
    }

    // Update user with hashed password if provided
    const data = await nguoidungService.updateNd({
      id,
      email,
      password: hashedPassword, // Only hashed if provided
      username,
      MaQuyen,
    });
    console.log("🚀 ~ updateND ~ data:", data);

    // Respond with the result from the service
    return res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    console.error("🚀 ~ updateND ~ error:", error);
    return res.status(500).json({ message: "Internal Server Error", code: -1 });
  }
};

module.exports = {
  getnguoidung,
  addnguoidung,
  delnguoidung,
  getnguoidungById,
  updateND,
  getNguoidungByUsername,
  hashPasswords,
};
