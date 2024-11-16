const KynangService = require("../services/Kynang.service");
const getKynang = async (req, res) => {
  try {
    const data = await KynangService.getAllKynang();
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const addKynang = async (req, res) => {
  try {
    const data = await KynangService.createKynang(req.body);
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const delKynang = async (req, res) => {
  try {
    const data = await KynangService.delKynang(req.body);
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const getKynangById = async (req, res) => {
  try {
    const data = await KynangService.getKynangById(req.query.id);
    return res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {}
};
const updateKynang = async (req, res) => {
  try {
    const data = await KynangService.updateKynang(req.body);
    return res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {}
};
module.exports = {
  getKynang,
  addKynang,
  delKynang,
  getKynangById,
  updateKynang,
};
