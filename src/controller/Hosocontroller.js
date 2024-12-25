const HosoService = require("../services/HosoService");
const db = require("../models/index");
const { where } = require("sequelize");
const nodemailer = require("nodemailer");
const env = require("dotenv");
env.config();
const getAllHoso = async (req, res) => {
  try {
    const data = await HosoService.getAllHoso();
    res.status(data.status).json({
      code: data.code,
      message: data.message,
      data: data.data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal Server Error",
      code: -1,
      data: "",
    });
  }
};

const createHoso = async (req, res) => {
  try {
    // Lấy dữ liệu từ body
    const {
      tenhoso,
      kyNangLapTrinh,
      capBacHienTai,
      mucTieuNgheNghiep,
      duAnDaThamGia,
      NguoitimviecId,
      kinhNghiemLamViec,
      trinhDoHocVan,
    } = req.body;

    // Lấy URL file nếu có
    const fileHoso = req.fileUrl;

    // Kiểm tra trường bắt buộc
    if (!tenhoso || !NguoitimviecId || !mucTieuNgheNghiep) {
      return res.status(400).json({
        code: -1,
        message: "Thiếu thông tin bắt buộc",
        data: null,
      });
    }

    // Xử lý kyNangLapTrinh
    let skillsArray = [];
    if (kyNangLapTrinh) {
      if (Array.isArray(kyNangLapTrinh)) {
        skillsArray = kyNangLapTrinh;
      } else if (typeof kyNangLapTrinh === "string") {
        try {
          // Nếu frontend gửi lên dạng chuỗi JSON, parse thành mảng
          skillsArray = JSON.parse(kyNangLapTrinh);
          if (!Array.isArray(skillsArray)) {
            throw new Error("Kỹ năng lập trình phải là một mảng");
          }
        } catch (error) {
          return res.status(400).json({
            code: -1,
            message: "Kỹ năng lập trình không hợp lệ",
            data: null,
          });
        }
      } else {
        return res.status(400).json({
          code: -1,
          message: "Kỹ năng lập trình phải là một mảng hoặc chuỗi JSON hợp lệ",
          data: null,
        });
      }
    }

    // Gọi service để tạo hồ sơ
    const data = await HosoService.createHoso({
      tenhoso,
      kyNangLapTrinh: skillsArray,
      capBacHienTai,
      mucTieuNgheNghiep,
      duAnDaThamGia,
      NguoitimviecId,
      fileHoso,
      kinhNghiemLamViec,
      trinhDoHocVan,
    });

    // Trả về kết quả thành công
    return res.status(data.status).json({
      code: data.code,
      message: data.message,
      data: data.data,
    });
  } catch (error) {
    // Log lỗi và trả về lỗi
    console.error("Error in createHoso:", error);
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      code: -1,
      data: null,
    });
  }
};

const updateHoso = async (req, res) => {
  try {
    const {
      id,
      tenhoso,
      kyNangLapTrinh,
      capBacHienTai,
      mucTieuNgheNghiep,
      duAnDaThamGia,
      NguoitimviecId,
      kinhNghiemLamViec,
      trinhDoHocVan,
    } = req.body;
    console.log("🚀 ~ createHoso ~ req.body:", req.body);
    const fileHoso = req.fileUrl;

    const data = await HosoService.updateHoso({
      id,
      tenhoso,
      kyNangLapTrinh,
      capBacHienTai,
      mucTieuNgheNghiep,
      duAnDaThamGia,
      NguoitimviecId,
      fileHoso,
      kinhNghiemLamViec,
      trinhDoHocVan,
    });
    res.status(data.status).json({
      code: data.code,
      message: data.message,
      data: data.data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal Server Error",
      code: -1,
      data: "",
    });
  }
};

const XoaHoso = async (req, res) => {
  try {
    const data = await HosoService.XoaHoso(req.query.id);
    res.status(data.status).json({
      code: data.code,
      message: data.message,
      data: data.data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal Server Error",
      code: -1,
      data: "",
    });
  }
};

const getHosoByhs = async (req, res) => {
  console.log("🚀 ~ getHosoByhs called with query:", req.query);

  const id = req.query.id;
  const id1 = req.query.id1;

  // Validate input
  if (!id) {
    console.warn("⚠️ ~ Missing or invalid ID in request query");
    return res.status(400).json({
      message: "Invalid or missing ID",
      code: -1,
      data: "",
    });
  }

  try {
    // Fetch data using service
    const data = await HosoService.getHosoById(id);
    console.log("✅ ~ Fetched data:", data);

    // If record is found, update its status
    if (data.status === 200) {
      const updateResult = await db.Ungtuyen.update(
        { trangthai: "Đã xem" },
        { where: { id: id1 } }
      );

      if (updateResult[0] > 0) {
        // const transporter = nodemailer.createTransport({
        //   service: "Gmail", // Or your preferred email provider
        //   auth: {
        //     user: process.env.email, // Your email
        //     pass: process.env.password, // Your email password
        //   },
        // });
        // const mailOptions = {
        //   from: process.env.email,
        //   to: req.body.email,
        //   subject: "Xác minh email",
        //   html: `<p>Chào ${req.body.username},</p>
        //              <p>Vui lòng xác minh email của bạn bằng cách nhấp vào liên kết bên dưới:</p>
        //              <a href="${verificationUrl}">Xác minh email</a>
        //              <p>Liên kết này sẽ hết hạn sau 1 giờ.</p>`,
        // };

        // await transporter.sendMail(mailOptions);
        console.log(`✅ ~ Record ${id} status updated to 'Đã xem'`);
      } else {
        console.warn(`⚠️ ~ Failed to update status for record ${id}`);
      }
    }

    // Respond with the fetched data
    res.status(data.status).json({
      code: data.code,
      message: data.message,
      data: data.data,
    });
  } catch (error) {
    console.error("❌ ~ Error in getHosoByhs:", error);
    res.status(500).json({
      message: error.message || "Internal Server Error",
      code: -1,
      data: "",
    });
  }
};

const getHosoById = async (req, res) => {
  try {
    const data = await HosoService.getHosoById(req.params.id);
    res.status(data.status).json({
      code: data.code,
      message: data.message,
      data: data.data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal Server Error",
      code: -1,
      data: "",
    });
  }
};

module.exports = {
  getAllHoso,
  createHoso,
  updateHoso,
  XoaHoso,
  getHosoById,
  getHosoByhs,
};
