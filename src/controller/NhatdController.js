const ntdService = require("../services/Nhatd.service");
const db = require("../models/index");
const nodemailer = require("nodemailer");
const env = require("dotenv");
env.config();
const getAllNtd = async (req, res) => {
  try {
    const data = await ntdService.getAllNtd();
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const getAllNtdtk = async (req, res) => {
  try {
    const data = await ntdService.getAllNtdtk(req.query.id);
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
// Assuming the model is in a folder named models
const addNtd = async (req, res) => {
  try {
    console.log("repbody", req.body);
    const {
      ten,
      email,
      sdt,
      website,
      linhvuc,
      diachi,
      MaND,
      Soluongdangbai,
      thongtin,
    } = req.body;
    const logo = req.fileUrl;
    const newNtd = await ntdService.createNtd({
      ten,
      email,
      sdt,
      website,
      linhvuc,
      diachi,
      MaND: MaND,
      logo,
      thongtin,
      Soluongdangbai: Soluongdangbai || 3, // Default to 0 if not provided
    });

    // Return a success response
    res.status(201).json({
      code: 0,
      message: "Employer added successfully.",
      data: newNtd,
    });
  } catch (error) {
    console.error("Error adding employer:", error);

    // Handle specific Sequelize validation errors
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        code: -1,
        message: error.errors.map((err) => err.message).join(", "),
        data: "",
      });
    }

    // Handle unexpected errors
    res.status(500).json({
      code: -1,
      message: "Internal Server Error",
      data: "",
    });
  }
};

const updateNtd = async (req, res) => {
  try {
    // Destructure required fields from the request body
    const { id, ten, email, sdt, website, linhvuc, diachi, thongtin } =
      req.body;
    console.log("🚀 ~ updateNtd ~ req.body:", req.body);

    // Conditionally include 'logo' if it exists in req.fileUrl
    const logo = req.fileUrl || null;

    // Prepare the updated data object
    const updatedData = {
      id,
      ten,
      email,
      sdt,
      website,
      linhvuc,
      diachi,
      thongtin,
    };

    // Add logo only if it exists
    if (logo) {
      updatedData.logo = logo;
    }

    // Call the service layer to update the record
    const data = await ntdService.updateNtd(updatedData);

    // Send a successful response
    res.status(data.status).json({
      code: data.code,
      message: data.message,
      data: data.data,
    });
  } catch (error) {
    console.error("🚨 Error in updateNtd:", error.message);
    return res
      .status(500)
      .json({ message: "Failed to update record", code: -1, data: "" });
  }
};

const updateTrangthaiService = async (req, res) => {
  console.log("🚀 ~ updateTrangthaiService ~ req.body:", req.body.MaND);
  try {
    const data = await db.Nguoidung.findOne({
      where: { id: req.body.MaND },
    });
    console.log("🚀 ~ updateTrangthaiService ~ data:", data);
    const response = await ntdService.updateTrangthaiService(req.body);
    console.log("🚀 ~ updateTrangthaiService ~ response:", response);

    const transporter = nodemailer.createTransport({
      service: "Gmail", // Or your preferred email provider
      auth: {
        user: process.env.email, // Your email
        pass: process.env.password, // Your email password
      },
    });
    const mailOptions = {
      from: process.env.email,
      to: data.email,
      subject: "Kiểm duyệt thành công",
      html: `<p>Chào ${data.username},</p>
             <h2>   ${req.body.ten}</h2>
             <p>Đã được kiểm duyệt.</p>
            <p>và giờ đây bạn có thể đăng tuyển dụng</p> `,
    };
    await transporter.sendMail(mailOptions);

    return res.status(response.status).json({
      code: response.code,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const deleteNtd = async (req, res) => {
  try {
    const data = await ntdService.XoaNtd(req.body.id);
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};

const getNtdById = async (req, res) => {
  try {
    const data = await ntdService.getNtdById(req.query.id);
    console.log("🚀 ~ getNtdById ~ req.query.id:", req.query.id);
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const getNtdByIdNTD = async (req, res) => {
  console.log("🚀 ~ getNtdByIdNTD ~ req:", req.query.id);
  try {
    const data = await ntdService.getNtdByIdNTD(req.query.id);
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};

module.exports = {
  getAllNtd,
  addNtd,
  updateNtd,
  deleteNtd,
  getNtdById,
  getNtdByIdNTD,
  updateTrangthaiService,
  getAllNtdtk,
};
