const jbpservice = require("../services/Tintd.service");
const db = require("../models/index");

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
// const searchJobPostsByKeyword = async (req, res) => {
//   // const keyword =req.body.keyword
//   // console.log("jdjsa",keyword)
//   // if (!keyword) {
//   //   return res.status(400).json({ message: 'Keyword is required' });
//   // }
//   // try {
//   //   const data = await jbpservice.searchTintd(keyword);
//   //   res
//   //     .status(data.status)
//   //     .json({ code: data.code, message: data.message, data: data.data });
//   // } catch (error) {
//   //   return res.status(500).json({ message: error.message, code: -1, data: "" });
//   // }

// };
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
      MaNTD,
      skills,
      loaiHopdong,
      diaChiLamviec,
      kinhNghiem,
    } = req.body;
    const newJobPost = await db.Tintuyendung.create({
      tieude,
      mota,
      Ngayhethan,
      trangthai,
      mucluong,
      MaNTD,
      loaiHopdong,
      diaChiLamviec,
      kinhNghiem,
    });

    const jobSkillLinks = skills.map((skillId) => ({
      MaTTD: newJobPost.id,
      MaKN: skillId,
    }));

    await db.Kynangtuyendung.bulkCreate(jobSkillLinks);

    res.status(201).json({
      message: "Job post created successfully with additional details.",
      jobPost: newJobPost,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the job post." });
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
};
