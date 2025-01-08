const jbpservice = require("../services/Tintd.service");
const db = require("../models/index");
const Nhatd = require("../services/Nhatd.service");
const { sequelize, where } = require("sequelize");
const nodemailer = require("nodemailer");
const EventEmitter = require("events");
const applicationEvents = new EventEmitter();
const env = require("dotenv");
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
const getAllTintd = async (req, res) => {
  try {
    const data = await jbpservice.getAllTintd();
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const getAllTintdadmin = async (req, res) => {
  console.time("ad");
  try {
    const data = await jbpservice.getAllTintdadmin();
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
  console.timeEnd("ad");
};
const updateTrangthaiService = async (req, res) => {
  try {
    const data = await db.Nguoidung.findOne({
      where: { id: req.body.employer.MaND },
    });
    const response = await jbpservice.updateTrangthaiService(req.body);

    // Phát sự kiện gửi email
    applicationEvents.emit("sendEmail", {
      to: data.email,
      subject: "Xác minh email",
      html: `<p>Chào ${data.username},</p>
             <p>Bài đăng tuyển dụng <h3>${req.body.tieude}</h3> đã được duyệt.</p>`,
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
const updateTrangthaiServiceAnorGiahan = async (req, res) => {
  try {
    // Fetch employer details
    const user = await db.Nguoidung.findOne({
      where: { id: req.body.employer.MaND },
    });

    if (!user || !user.email) {
      return res.status(404).json({
        code: 1,
        message: "Người dùng không tồn tại hoặc thiếu email.",
      });
    }

    // Update the status
    const response = await jbpservice.updateTrangthaiServiceAnorGiahan(
      req.body
    );

    // Configure nodemailer
    if (!process.env.email || !process.env.password) {
      return res.status(500).json({
        code: 1,
        message: "Cấu hình email không đầy đủ.",
      });
    }

    // Determine the email content based on status
    const isExtending = req.body.trangthai === "Đã duyệt";

    applicationEvents.emit("sendEmail", {
      to: user.email,
      subject: "Thông báo trạng thái bài đăng",
      html: `
        <p>Chào ${user.username},</p>
        <p>Bài đăng tuyển dụng <strong>${req.body.tieude}</strong> đã được 
        ${isExtending ? `gia hạn thêm 30 ngày` : `tạm dừng`}.</p>
        ${
          isExtending
            ? `<p>Thời hạn mới: ${new Date(
                response.data.Ngayhethan
              ).toLocaleDateString("vi-VN")}</p>`
            : `<p>Bạn có thể gia hạn bài đăng bất cứ lúc nào.</p>`
        }
      `,
    });
    // Return the response
    return res.status(response.status).json({
      code: response.code,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    return res.status(500).json({
      code: 1,
      message: "Đã xảy ra lỗi trong quá trình xử lý.",
      error: err.message,
    });
  }
};

const updateTrangthaiServicetc = async (req, res) => {
  try {
    const { post, reason } = req.body;

    const data = await db.Nguoidung.findOne({
      where: { id: post.employer.MaND },
    });
    var response = await jbpservice.updateTrangthaiServicetc(post);

    applicationEvents.emit("sendEmail", {
      to: data.email,
      subject: "Xác minh email",
      html: `<p>Chào ${data.username},</p>
             <p>Bài đăng tuyển dụng  đã bị từ chối với lý do</p>
             <p> ${reason}</p>
             
             `,
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
const getAllTintdcd = async (req, res) => {
  try {
    const data = await jbpservice.getAllTintdcd();
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const getTintdByID = async (req, res) => {
  try {
    const data = await jbpservice.getTinTdByID(req.query.id);
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const searchJobPostsByKeyword = async (req, res) => {
  const keyword = req.query.keyword;

  if (!keyword) {
    return res.status(400).json({ message: "Keyword is required" });
  }
  try {
    const data = await jbpservice.searchTinTDd(keyword);
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const getTtd = async (req, res) => {
  try {
    const data = await jbpservice.getTtd();
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const addTtd = async (req, res) => {
  try {
    const data = await jbpservice.createTtd(req.body);
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const delTtd = async (req, res) => {
  try {
    const data = await jbpservice.XoaTtd(req.query.id);
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const getTtdById = async (req, res) => {
  try {
    const data = await jbpservice.getTtdById(req.query.id);
    return res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {}
};
const getTtdntdId = async (req, res) => {
  try {
    const employer = await db.Nhatuyendung.findOne({
      where: { MaND: req.query.id },
    });
    const data = await jbpservice.getAllTintdcdByEmployer(employer.id);

    return res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {}
};
const getTtdntdIddetail = async (req, res) => {
  try {
    const data = await jbpservice.getAllTintdcdByEmployer(req.query.id);

    return res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {}
};
const updateTtd = async (req, res) => {
  try {
    const data = await jbpservice.updateTtd(req.body);

    return res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {}
};
const addJobPostWithDetails = async (req, res) => {
  try {
    const {
      tieude,
      mota,
      trangthai,
      mucluong,
      Kynang = [],
      Capbac = [],
      loaiHopdong,
      diaChiLamviec,
      kinhNghiem,
      Ma,
      noibatnline,
    } = req.body;

    const employerId = parseInt(Ma); // Thay bằng logic để lấy ID của nhà tuyển dụng từ `req` hoặc `token`

    // Kiểm tra số lượng đăng tuyển
    const employer = await db.Nhatuyendung.findOne({
      where: { MaND: employerId },
    });

    if (!employer) {
      return res.status(404).json({ message: "Employer not found." });
    }

    if (employer.Soluongdangbai <= 0) {
      return res.status(400).json({
        message: "No remaining job posts available for this employer.",
      });
    }
    const existingPost = await db.Tintuyendung.findOne({
      where: {
        tieude: tieude,
        MaNTD: employer.id,
      },
    });

    if (existingPost) {
      return res.status(400).json({
        message: "Tin tuyển dụng với tiêu đề này đã tồn tại",
      });
    }

    // Tạo tin tuyển dụng
    const newJobPost = await db.Tintuyendung.create({
      tieude,
      mota,
      trangthai,
      mucluong,
      MaNTD: employer.id,
      loaiHopdong,
      diaChiLamviec,
      kinhNghiem,
      noibat: noibatnline,
    });

    if (noibatnline === false) {
      await employer.update({
        Soluongdangbai: employer.Soluongdangbai - 1,
      });
    } else {
      await employer.update({
        Soluongnoibat: employer.Soluongnoibat - 1,
      });
    }

    // Validate and process skills
    const validSkills = Array.isArray(Kynang)
      ? Kynang.filter((id) => id != null)
      : [];

    if (validSkills.length > 0) {
      const jobSkillLinks = validSkills.map((skillId) => ({
        MaTTD: newJobPost.id,
        MaKN: skillId,
      }));
      await db.Kynangtuyendung.bulkCreate(jobSkillLinks);
    } else {
      console.warn("⚠️ ~ No valid skills provided. Skipping skill insertion.");
    }

    // Validate and process levels
    const validLevels = Array.isArray(Capbac)
      ? Capbac.filter((id) => id != null)
      : [];
    if (validLevels.length > 0) {
      const jobLevelLinks = validLevels.map((levelId) => ({
        MaTTD: newJobPost.id,
        MaCB: levelId,
      }));
      await db.Vitrituyendung.bulkCreate(jobLevelLinks);
    } else {
      console.warn("⚠️ ~ No valid levels provided. Skipping level insertion.");
    }

    res.status(201).json({
      message: "Thêm tin thành công chờ admin duyệt.",
      jobPost: newJobPost,
      remainingPosts: employer.SoLuongDangTuyen,
      details: {
        skills: validSkills,
        levels: validLevels,
      },
    });
  } catch (error) {
    console.error("Error in addJobPostWithDetails:", error);
    res.status(500).json({
      message: "An error occurred while creating the job post.",
      error: error.message,
    });
  }
};

const getJobsApplicationCounts = async (maNTD) => {
  try {
    // Get all job postings with their application counts
    const jobStats = await db.Tintuyendung.findAll({
      where: {
        MaNTD: maNTD,
      },
      attributes: [
        "id",
        "tieude",
        "Ngaytao",
        "Ngayhethan",
        "trangthai",
        "mucluong",
        "diaChiLamviec",
        [
          db.sequelize.literal(
            "(SELECT COUNT(*) FROM Ungtuyen WHERE Ungtuyen.MaTTD = Tintuyendung.id)"
          ),
          "totalApplications",
        ],
        [
          db.sequelize.literal(
            `(SELECT COUNT(*) FROM Ungtuyen WHERE Ungtuyen.MaTTD = Tintuyendung.id AND Ungtuyen.trangthai = 'Đã nộp')`
          ),
          "pendingApplications",
        ],
        [
          db.sequelize.literal(
            `(SELECT COUNT(*) FROM Ungtuyen WHERE Ungtuyen.MaTTD = Tintuyendung.id AND Ungtuyen.trangthai = 'Đã duyệt')`
          ),
          "acceptedApplications",
        ],
        [
          db.sequelize.literal(
            `(SELECT COUNT(*) FROM Ungtuyen WHERE Ungtuyen.MaTTD = Tintuyendung.id AND Ungtuyen.trangthai = 'Từ chối')`
          ),
          "rejectedApplications",
        ],
      ],
      include: [
        {
          model: db.Nhatuyendung,
          as: "employer",
          attributes: ["ten"],
          where: { MaNTD: maNTD },
        },
      ],
      order: [["Ngaytao", "DESC"]],
    });

    // Format the response
    const formattedJobStats = jobStats.map((job) => ({
      jobId: job.id,
      title: job.tieude,
      createdAt: job.Ngaytao,
      expiryDate: job.Ngayhethan,
      status: job.trangthai,
      salary: job.mucluong,
      location: job.diaChiLamviec,
      employerName: job.employer.ten,
      applications: {
        total: parseInt(job.dataValues.totalApplications),
        pending: parseInt(job.dataValues.pendingApplications),
        accepted: parseInt(job.dataValues.acceptedApplications),
        rejected: parseInt(job.dataValues.rejectedApplications),
      },
    }));

    return {
      success: true,
      data: formattedJobStats,
    };
  } catch (error) {
    console.error("Error getting jobs application counts:", error);
    return {
      success: false,
      error: "Failed to get jobs application statistics",
    };
  }
};

// Express route handler
const getEmployerJobsApplicationStats = async (req, res) => {
  const maNTD = req.params.maNTD;

  if (!maNTD) {
    return res.status(400).json({
      success: false,
      error: "Employer ID is required",
    });
  }

  const result = await getJobsApplicationCounts(maNTD);

  if (!result.success) {
    return res.status(500).json(result);
  }

  res.json(result);
};
const updateExpiredJobs = async (req, res) => {
  try {
    const result = await jbpservice.updateExpiredJobs();

    if (!result.success) {
      return res.status(500).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  addJobPostWithDetails,
  getAllTintd,
  getTintdByID,
  getTtd,
  addTtd,
  delTtd,
  getTtdById,
  updateTtd,
  getAllTintdcd,
  updateTrangthaiService,
  getTtdntdId,
  searchJobPostsByKeyword,
  getAllTintdadmin,
  getTtdntdIddetail,
  getEmployerJobsApplicationStats,
  updateExpiredJobs,
  updateTrangthaiServicetc,
  updateTrangthaiServiceAnorGiahan,
};
