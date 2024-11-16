const nguoidungService = require("../services/nguoidung.service");
const getnguoidung = async (req, res) => {
  try {
    const data = await nguoidungService.getAllNguoidung();
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const addnguoidung = async (req, res) => {
  try {
    const data = await nguoidungService.createNguoidung(req.body);
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const delnguoidung = async (req, res) => {
  try {
    const data = await nguoidungService.del(req.body);
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const getnguoidungById = async (req, res) => {
  try {
    const data = await nguoidungService.getNguoidungById(req.query.id);
    return res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {}
};
const updateND = async (req, res) => {
  try {
    const data = await nguoidungService.updateNguoidung(req.body);
    return res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {}
};
module.exports = {
  getnguoidung,
  addnguoidung,
  delnguoidung,
  getnguoidungById,
  updateND,
};
