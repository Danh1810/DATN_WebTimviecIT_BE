const KnTTService = require("../services/Kynangtuyendung.service");
const getKnTT = async (req, res) => {
  try {
    const data = await KnTTService.getAllKNtuyendung();
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const addKnTT = async (req, res) => {
  try {
    const data = await KnTTService.createKNtuyendung(req.body);
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const delKnTT = async (req, res) => {
  try {
    const data = await KnTTService.delKnTT(req.body);
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const getKnTTByGroup = async (req, res) => {
  try {
    const data = await KnTTService.getKnTTByGroup(req.query.id);
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const getRoleById = async (req, res) => {
  try {
    const data = await KnTTService.getRoleById(req.query.id);
    return res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {}
};
const updateKntt = async (req, res) => {
  try {
    const data = await KnTTService.updateKNtuyendung(req.body);
    return res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {}
};
module.exports = {
  getKnTT,
  addKnTT,
  delKnTT,
  getKnTTByGroup,
  getRoleById,
  updateKntt,
};
