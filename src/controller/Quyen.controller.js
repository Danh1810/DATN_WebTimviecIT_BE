const QuyenService = require("../services/quyen.service");
const getQuyen = async (req, res) => {
  try {
    const data = await QuyenService.getAllQuyen();
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const getdk = async (req, res) => {
  try {
    const data = await QuyenService.getdk();
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const addQuyen = async (req, res) => {
  try {
    const data = await QuyenService.addQuyen(req.body);
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const delQuyen = async (req, res) => {
  try {
    const data = await QuyenService.delQuyen(req.body);
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const getQuyenByGroup = async (req, res) => {
  try {
    const data = await QuyenService.getQuyenByGroup(req.query.id);
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const getQuyenById = async (req, res) => {
  try {
    const data = await QuyenService.getQuyenById(req.query.id);
    return res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {}
};
const updatequyen = async (req, res) => {
  try {
    const data = await QuyenService.updateQuyen(req.body);
    return res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {}
};
module.exports = {
  getQuyen,
  addQuyen,
  delQuyen,
  getQuyenByGroup,
  getQuyenById,
  updatequyen,
  getdk,
};
