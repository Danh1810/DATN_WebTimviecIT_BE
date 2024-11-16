const ntdService = require("../services/Nhatd.service");

const getAllNtd = async (req, res) => {
  try {
    const data = await ntdService.getAllNtd();
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};

const addNtd = async (req, res) => {
  try {
    const data = await ntdService.createNtd(req.body);
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};

const updateNtd = async (req, res) => {
  try {
    const data = await ntdService.updateNtd(req.body);
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};

const deleteNtd = async (req, res) => {
  try {
    const data = await ntdService.XoaNtd(req.body.id);
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};

const getNtdById = async (req, res) => {
  try {
    const data = await ntdService.getNtdById(req.query.id);
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};

module.exports = {
  getAllNtd,
  addNtd,
  updateNtd,
  deleteNtd,
  getNtdById,
};
