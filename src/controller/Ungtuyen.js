const UTService = require("../services/Ungtuyen.service");
const db = require("../models/index");
const EventEmitter = require("events");
const applicationEvents = new EventEmitter();
const nodemailer = require("nodemailer");
const emailTransporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.email,
    pass: process.env.password,
  },
});
const getUT = async (req, res) => {
  try {
    const data = await UTService.getAllUT();
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const getUTlayhoso = async (req, res) => {
  try {
    const data = await UTService.layTatCaHSTheoTTD(req.query.id);
    console.log("🚀 ~ getUTlayhoso ~ req.query.id:", req.query.id);
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const getUTNTV = async (req, res) => {
  try {
    const id = req.query.id;
    const NTV = await db.Nguoitimviec.findOne({
      where: { MaND: id },
    });
    const data = await UTService.layTatCaHSTheoNTV(NTV.id);
    console.log("🚀 ~ getUTlayhoso ~ req.query.id:", req.query.id);
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
applicationEvents.on("newApplication", async ({ MaTTD, MaHS, NgayNop }) => {
  try {
    // Lấy thông tin tin tuyển dụng và nhà tuyển dụng
    const jobPosting = await db.Tintuyendung.findOne({
      where: { id: MaTTD },
      include: [
        {
          model: db.Nhatuyendung,
          as: "employer",
          include: [
            {
              model: db.Nguoidung,
              as: "user",
            },
          ],
        },
      ],
    });
    console.log("🚀 ~ applicationEvents.on ~ jobPosting:", jobPosting);
    // Lấy thông tin hồ sơ ứng viên
    const profile = await db.Hosocanhan.findOne({
      where: { id: MaHS },
      include: [
        {
          model: db.Nguoitimviec,
          as: "nguoitimviec",
        },
      ],
    });
    console.log("🚀 ~ applicationEvents.on ~ profile:", profile);
    if (!jobPosting?.employer?.user.email) {
      console.log("Không tìm thấy email nhà tuyển dụng");
      return;
    }
    console.log(
      "🚀 ~ applicationEvents.on ~ jobPosting.employer.user.email:",
      jobPosting.employer.user.email
    );

    const mailOptions = {
      from: process.env.email,
      to: jobPosting.employer.user.email,
      subject: "Thông báo: Có ứng viên mới ứng tuyển",
      html: `
        <h2>Thông báo ứng tuyển mới</h2>
        <p>Có ứng viên mới đã ứng tuyển vào vị trí <strong>${
          jobPosting.tieude || "N/A"
        }</strong></p>
        <p><strong>Thông tin ứng viên:</strong></p>
        <ul>
          <li>Họ tên: ${profile?.nguoitimviec?.hoVaTen || "N/A"}</li>
          <li>Ngày nộp: ${new Date(NgayNop).toLocaleString("vi-VN")}</li>
        </ul>
        <p>Vui lòng đăng nhập vào hệ thống để xem chi tiết hồ sơ ứng viên.</p>
      `,
    };

    await emailTransporter.sendMail(mailOptions);
    console.log("Đã gửi email thông báo thành công");
  } catch (error) {
    console.error("Lỗi khi gửi email thông báo:", error);
    // Không throw error để không ảnh hưởng đến luồng chính
  }
});

const addUT = async (req, res) => {
  try {
    const { MaTTD, MaHS } = req.body;
    const newApplication = {
      MaTTD,
      MaHS,
      NgayNop: new Date(),
    };

    const hoso = await db.Hosocanhan.findOne({ where: { id: MaHS } });

    if (!hoso) {
      return res.status(404).json({ message: "Hồ sơ không tồn tại" });
    }

    // Tìm người tìm việc liên quan đến hồ sơ này
    const nguoitimviec = await db.Nguoitimviec.findOne({
      where: { id: hoso.NguoitimviecId },
    });

    if (!nguoitimviec) {
      return res.status(404).json({ message: "Người tìm việc không tồn tại" });
    }

    // Giảm số lượng nộp hồ sơ đi 1 (nếu lớn hơn 0)
    if (nguoitimviec.Soluongnophoso > 0) {
      nguoitimviec.Soluongnophoso -= 1;
      await nguoitimviec.save();
    }

    // Lưu thông tin đơn ứng tuyển vào database
    await UTService.createUT(newApplication);

    // Emit event để gửi email
    applicationEvents.emit("newApplication", newApplication);

    res.status(201).json({ message: "Application submitted successfully!" });
  } catch (error) {
    console.error("Error submitting application:", error);
    res.status(500).json({ message: "Error submitting application" });
  }
};
const delUT = async (req, res) => {
  try {
    const data = await UTService.delUT(req.body);
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const getUTById = async (req, res) => {
  try {
    const data = await UTService.getUTById(req.query.id);
    return res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {}
};
const updateUT = async (req, res) => {
  try {
    const data = await UTService.updateUT(req.body);
    return res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {}
};
const { Op, Sequelize } = require("sequelize");

const getMonthlyApplications = async (maNTD) => {
  try {
    // Get all applications for jobs posted by this employer
    const monthlyStats = await db.Ungtuyen.findAll({
      attributes: [
        [
          Sequelize.fn("DATE_FORMAT", Sequelize.col("NgayNop"), "%Y-%m"),
          "month",
        ],
        [Sequelize.fn("COUNT", "*"), "applicationCount"],
      ],
      include: [
        {
          model: db.Tintuyendung,
          as: "UT_TTD",
          attributes: [],
          required: true,
          include: [
            {
              model: db.Nhatuyendung,
              as: "employer",
              attributes: [],
              where: { MaND: maNTD },
              required: true,
            },
          ],
        },
      ],
      group: [Sequelize.fn("DATE_FORMAT", Sequelize.col("NgayNop"), "%Y-%m")],
      order: [
        [
          Sequelize.fn("DATE_FORMAT", Sequelize.col("NgayNop"), "%Y-%m"),
          "DESC",
        ],
      ],
      raw: true,
    });

    // Format the response
    const formattedStats = monthlyStats.map((stat) => ({
      month: stat.month,
      slhoso: parseInt(stat.applicationCount),
    }));

    return {
      success: true,
      data: formattedStats,
    };
  } catch (error) {
    console.error("Error getting monthly applications:", error);
    return {
      success: false,
      error: "Failed to get monthly applications statistics",
    };
  }
};

// Express route handler
const getMonthlyApplicationsStats = async (req, res) => {
  const maNTD = req.query.id;
  console.log("🚀 ~ getMonthlyApplicationsStats ~ maNTD:", maNTD);

  if (!maNTD) {
    return res.status(400).json({
      success: false,
      error: "Employer ID is required",
    });
  }

  const result = await getMonthlyApplications(maNTD);

  if (!result.success) {
    return res.status(500).json(result);
  }

  res.json(result);
};

module.exports = {
  getUT,
  addUT,
  delUT,
  getUTById,
  updateUT,
  getUTlayhoso,
  getUTNTV,
  getMonthlyApplicationsStats,
};
