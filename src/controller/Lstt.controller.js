const LsttService = require("../services/LsThanhtoan.service");
const getLstt = async (req, res) => {
  try {
    const data = await LsttService.getAllLSTT();
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const addLstt = async (req, res) => {
  try {
    const data = await LsttService.createLSTT(req.body);
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const delLstt = async (req, res) => {
  try {
    const data = await LsttService.delLstt(req.body);
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const getLsttByGroup = async (req, res) => {
  try {
    const data = await LsttService.getLsttByGroup(req.query.id);
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const getRoleById = async (req, res) => {
  try {
    const data = await LsttService.getRoleById(req.query.id);
    return res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {}
};
const updateLSTT = async (req, res) => {
  try {
    const data = await LsttService.updateLSTT(req.body);
    return res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {}
};
module.exports = {
  getLstt,
  addLstt,
  delLstt,
  getLsttByGroup,
  getRoleById,
  updateLSTT,
};