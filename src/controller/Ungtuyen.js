const UTService = require("../services/Ungtuyen.service");
const getUT = async (req, res) => {
  try {
    const data = await UTService.getAllUT();
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const addUT = async (req, res) => {
  try {
    const { MaTTD, MaHS } = req.body;
    const newApplication = {
      MaTTD,
      MaHS,
      NgayNop: new Date(),
    };

    // Lưu thông tin đơn ứng tuyển vào database
    await UTService.createUT(newApplication);

    res.status(201).json({ message: "Application submitted successfully!" });
  } catch (error) {
    console.error("Error submitting application:", error);
    res.status(500).json({ message: "Error submitting application" });
  }
};
const delUT = async (req, res) => {
  try {
    const data = await UTService.delUT(req.body);
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const getUTById = async (req, res) => {
  try {
    const data = await UTService.getUTById(req.query.id);
    return res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {}
};
const updateUT = async (req, res) => {
  try {
    const data = await UTService.updateUT(req.body);
    return res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {}
};
module.exports = {
  getUT,
  addUT,
  delUT,
  getUTById,
  updateUT,
};
