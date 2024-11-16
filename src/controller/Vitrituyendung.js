const VtriService = require("../services/Vitrituyendung.service");
const getVtri = async (req, res) => {
  try {
    const data = await VtriService.getAllVttuyendung();
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const addVtri = async (req, res) => {
  try {
    const data = await VtriService.createVttuyendung(req.body);
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const delVtri = async (req, res) => {
  try {
    const data = await VtriService.XoaVttuyendung(req.body);
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const getVtriById = async (req, res) => {
  try {
    const data = await VtriService.getVttuyendungById(req.query.id);
    return res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {}
};
const updateVtri = async (req, res) => {
  try {
    const data = await VtriService.updateVttuyendung(req.body);
    return res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {}
};
module.exports = {
  getVtri,
  addVtri,
  delVtri,
  getVtriById,
  updateVtri,
};
