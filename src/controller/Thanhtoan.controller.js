const thanhtoanService = require("../services/thanhtoan.service");
const getTT = async (req, res) => {
  try {
    const data = await thanhtoanService.getAllTT();
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const addTT = async (req, res) => {
  try {
    const data = await thanhtoanService.createTT(req.body);
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const delTT = async (req, res) => {
  try {
    const data = await thanhtoanService.XoaTT(req.body);
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const getttById = async (req, res) => {
  try {
    const data = await thanhtoanService.getTTById(req.query.id);
    return res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {}
};
const updateTT = async (req, res) => {
  try {
    const data = await thanhtoanService.updateTT(req.body);
    return res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {}
};
module.exports = {
  getTT,
  addTT,
  delTT,
  getttById,
  updateTT,
};
