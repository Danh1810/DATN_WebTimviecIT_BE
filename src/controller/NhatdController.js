const ntdService = require("../services/Nhatd.service");
const db = require("../models/index");
const nodemailer = require("nodemailer");
const env = require("dotenv");
const EventEmitter = require("events");
const applicationEvents = new EventEmitter();

env.config();
applicationEvents.on("sendEmail", async (data) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail", // Or your preferred email provider
      auth: {
        user: process.env.email, // Your email
        pass: process.env.password, // Your email password
      },
    });

    const mailOptions = {
      from: process.env.email,
      to: data.to,
      subject: data.subject,
      html: data.html,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully to:", data.to);
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
});
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
const getAllNtdtka = async (req, res) => {
  try {
    const data = await ntdService.getAllNtdtka();
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const searchJNTDByKeyword = async (req, res) => {
  const keyword = req.query.keyword;

  if (!keyword) {
    return res.status(400).json({ message: "Keyword is required" });
  }
  try {
    const data = await ntdService.searchNhatuyendung(keyword);
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
const getCountEmployersByField = async (req, res) => {
  try {
    const result = await ntdService.countEmployersByField();

    if (!result || !result.length) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy dữ liệu thống kê",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Thống kê số lượng nhà tuyển dụng theo lĩnh vực",
      data: result,
    });
  } catch (error) {
    console.error("Lỗi tại controller:", error);
    return res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi thống kê nhà tuyển dụng theo lĩnh vực",
    });
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

    // Tìm kiếm công ty có tên hoặc email gần giống
    const similarCompanies = await ntdService.findSimilarCompanies(ten, email);

    if (similarCompanies.length > 0) {
      return res.status(409).json({
        code: -1,
        message: "công ty đã được đăng ký",
        data: similarCompanies, // Trả về thông tin các công ty tương tự (nếu cần)
      });
    }

    // Thêm mới công ty
    const newNtd = await ntdService.createNtd({
      ten,
      email,
      sdt,
      website,
      linhvuc,
      diachi,
      MaND,
      logo,
      thongtin,
      Soluongdangbai: Soluongdangbai || 3, // Mặc định là 3 nếu không có
    });

    // Trả về kết quả thành công
    res.status(201).json({
      code: 0,
      message: "Employer added successfully.",
      data: newNtd,
    });
  } catch (error) {
    console.error("Error adding employer:", error);

    // Xử lý lỗi Sequelize validation
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        code: -1,
        message: error.errors.map((err) => err.message).join(", "),
        data: "",
      });
    }

    // Xử lý lỗi không mong muốn
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
  try {
    const data = await db.Nguoidung.findOne({
      where: { id: req.body.MaND },
    });

    const response = await ntdService.updateTrangthaiService(req.body);

    applicationEvents.emit("sendEmail", {
      to: data.email,
      subject: "Kiểm duyệt thành công",
      html: `<p>Chào ${data.username},</p>
             <h2>   ${req.body.ten}</h2>
             <p>Đã được kiểm duyệt.</p>
            <p>và giờ đây bạn có thể đăng tuyển dụng</p> `,
    });

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
    const data = await ntdService.XoaNtd(req.query.id);
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

    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const getNtdByIdNTD = async (req, res) => {
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
  getCountEmployersByField,
  searchJNTDByKeyword,
  getAllNtdtka,
};
