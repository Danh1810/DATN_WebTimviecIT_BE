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
  console.log("🚀 ~ createHoso ~ req:", req);

  try {
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
    console.log("🚀 ~ createHoso ~ req.body:", req.body);
    const fileHoso = req.fileUrl;

    const data = await HosoService.createHoso({
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
        { where: { id: id } }
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
