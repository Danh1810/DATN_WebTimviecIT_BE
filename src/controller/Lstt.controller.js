const LsttService = require("../services/LsThanhtoan.service");
const db = require("../models/index");
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
    const data = await LsttService.getLSTTById(req.query.id);
    return res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {}
};
const getLsttByNTDId = async (req, res) => {
  try {
    const employer = await db.Nhatuyendung.findOne({
      where: { MaND: req.query.id },
    });
    console.log("🚀 ~ getLsttByNTDId ~ req.query.id:", req.query.id);
    const data = await LsttService.getLSTTByNTDId(employer.id);
    console.log("🚀 ~ getLsttByNTDId ~ data:", data);
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
const create = async (req, res) => {
  try {
    const result = await LsttService.create(req.body);
    console.log("🚀 ~ create ~ result:", result);

    return res.status(result.status).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const callback = async (req, res) => {
  try {
    const result = await LsttService.callback(req.body);
    return res.status(result.status).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};
module.exports = {
  getLstt,
  addLstt,
  delLstt,
  getLsttByGroup,
  getRoleById,
  updateLSTT,
  create,
  callback,
  getLsttByNTDId,
};
