const jbpservice = require("../services/Tintd.service");
const db = require("../models/index");
const Nhatd = require("../services/Nhatd.service");

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
const updateTrangthaiService = async (req, res) => {
  try {
    var response = await jbpservice.updateTrangthaiService(req.body);
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
  const keyword = req.body.keyword;
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
    const data = await jbpservice.delTtd(req.body);
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
    console.log("🚀 ~ getTtdById ~ req:", req.query.id);
    return res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {}
};
const getTtdntdId = async (req, res) => {
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
      Ngayhethan,
      trangthai,
      mucluong,
      Kynang = [],
      Capbac = [],
      loaiHopdong,
      diaChiLamviec,
      kinhNghiem,
      Ma,
    } = req.body;

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

    if (employer.SoLuongDangTuyen <= 0) {
      return res.status(400).json({
        message: "No remaining job posts available for this employer.",
      });
    }

    // Tạo tin tuyển dụng
    const newJobPost = await db.Tintuyendung.create({
      tieude,
      mota,
      Ngayhethan,
      trangthai,
      mucluong,
      MaNTD: employer.id,
      loaiHopdong,
      diaChiLamviec,
      kinhNghiem,
    });

    // Cập nhật số lượng đăng tuyển
    await employer.update({
      Soluongdangbai: employer.Soluongdangbai - 1,
    });
    console.log("🚀 ~ Updated employer's job posting count.");

    // Validate and process skills
    const validSkills = Array.isArray(Kynang)
      ? Kynang.filter((id) => id != null)
      : [];
    console.log("🚀 ~ Valid Skills:", validSkills);
    if (validSkills.length > 0) {
      const jobSkillLinks = validSkills.map((skillId) => ({
        MaTTD: newJobPost.id,
        MaCB: skillId,
      }));
      await db.Vitrituyendung.bulkCreate(jobSkillLinks);
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
        MaKN: levelId,
      }));
      await db.Kynangtuyendung.bulkCreate(jobLevelLinks);
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
};
