const jbpservice = require("../services/Tintd.service");
const db = require("../models/index");
const Nhatd = require("../services/Nhatd.service");
const { sequelize, where } = require("sequelize");
const nodemailer = require("nodemailer");
const env = require("dotenv");
env.config();

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
  try {
    const data = await jbpservice.getAllTintdadmin();
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const updateTrangthaiService = async (req, res) => {
  try {
    const data = await db.Nguoidung.findOne({
      where: { id: req.body.employer.MaND },
    });
    var response = await jbpservice.updateTrangthaiService(req.body);
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
      subject: "Xác minh email",
      html: `<p>Chào ${data.username},</p>
             <p>Bài đăng tuyển dụng <h3> ${req.body.tieude}</h3> đã được duyệt</p>
             
             `,
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
  console.log("jdjsa", keyword);
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
    console.log("🚀 ~ getTtdById ~ req:", req.query.id);
    return res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {}
};
const getTtdntdIddetail = async (req, res) => {
  try {
    const data = await jbpservice.getAllTintdcdByEmployer(req.query.id);
    console.log("🚀 ~ getTtdById ~ req:", req.query.id);
    return res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {}
};
const updateTtd = async (req, res) => {
  try {
    const data = await jbpservice.updateTtd(req.body);
    console.log("🚀 ~ updateTtd ~ data:", data);
    console.log("🚀 ~ updateTtd ~ req.body:", req.body);
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
    console.log("🚀 ~ addJobPostWithDetails ~ req.body:", req.body);

    const employerId = parseInt(Ma); // Thay bằng logic để lấy ID của nhà tuyển dụng từ `req` hoặc `token`

    console.log("🚀 ~ addJobPostWithDetails ~ employerId:", employerId);
    console.log("🚀 ~ Creating Job Post with Title:", tieude);

    // Kiểm tra số lượng đăng tuyển
    const employer = await db.Nhatuyendung.findOne({
      where: { MaND: employerId },
    });
    console.log("🚀 ~ addJobPostWithDetails ~ employer:", employer);
    if (!employer) {
      return res.status(404).json({ message: "Employer not found." });
    }

    if (employer.Soluongdangbai <= 0) {
      return res.status(400).json({
        message: "No remaining job posts available for this employer.",
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
    console.log("🚀 ~ addJobPostWithDetails ~ newJobPost:", newJobPost);

    if (noibatnline === false) {
      await employer.update({
        Soluongdangbai: employer.Soluongdangbai - 1,
      });
    } else {
      await employer.update({
        Soluongnoibat: employer.Soluongnoibat - 1,
      });
    }
    console.log("🚀 ~ Updated employer's job posting count.");

    // Validate and process skills
    const validSkills = Array.isArray(Kynang)
      ? Kynang.filter((id) => id != null)
      : [];
    console.log("🚀 ~ Valid Skills:", validSkills);
    if (validSkills.length > 0) {
      const jobSkillLinks = validSkills.map((skillId) => ({
        MaTTD: newJobPost.id,
        MaKN: skillId,
      }));
      await db.Kynangtuyendung.bulkCreate(jobSkillLinks);
      console.log("🚀 ~ Successfully inserted skills:", jobSkillLinks);
    } else {
      console.warn("⚠️ ~ No valid skills provided. Skipping skill insertion.");
    }

    // Validate and process levels
    const validLevels = Array.isArray(Capbac)
      ? Capbac.filter((id) => id != null)
      : [];
    console.log("🚀 ~ Valid Levels after filter:", validLevels);
    if (validLevels.length > 0) {
      const jobLevelLinks = validLevels.map((levelId) => ({
        MaTTD: newJobPost.id,
        MaCB: levelId,
      }));
      await db.Vitrituyendung.bulkCreate(jobLevelLinks);
      console.log("🚀 ~ Successfully inserted levels:", jobLevelLinks);
    } else {
      console.warn("⚠️ ~ No valid levels provided. Skipping level insertion.");
    }

    res.status(201).json({
      message: "Job post created successfully with additional details.",
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
};
