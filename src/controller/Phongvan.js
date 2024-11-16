const phongvanService = require("../services/Phongvan.service");
const getPhongvan = async (req, res) => {
  try {
    const data = await phongvanService.getAllPhongvan();
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const addPv = async (req, res) => {
  try {
    const data = await phongvanService.createPhongvan(req.body);
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const delpv = async (req, res) => {
  try {
    const data = await phongvanService.delRoles(req.body);
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const getPvById = async (req, res) => {
  try {
    const data = await phongvanService.getPhongvanById(req.query.id);
    return res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {}
};
const updatePv = async (req, res) => {
  try {
    const data = await phongvanService.updatePhongvan(req.body);
    return res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {}
};
module.exports = {
  getPhongvan,
  addPv,
  delpv,
  getPvById,
  updatePv,
};
