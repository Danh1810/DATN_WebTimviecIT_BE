const CapbacService = require("../services/Capbac.service");
const getCapbac = async (req, res) => {
  try {
    const data = await CapbacService.getAllCapbac();
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const addCapbac = async (req, res) => {
  try {
    const data = await CapbacService.createCapbac(req.body);
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const delCapbac = async (req, res) => {
  try {
    const data = await CapbacService.XoaCapbac(req.body);
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const getCapbacById = async (req, res) => {
  try {
    const data = await CapbacService.getCapbacById(req.query.id);
    return res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {}
};
const updateCapbac = async (req, res) => {
  try {
    const data = await CapbacService.updateCapbac(req.body);
    return res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {}
};
module.exports = {
  getCapbac,
  addCapbac,
  delCapbac,
  getCapbacById,
  updateCapbac,
};
