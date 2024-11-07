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
    const data = await jbpservice.getTinTdByID(req.body.id);
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

module.exports = { getAllTintd, getTintdByID };
