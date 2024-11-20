const NTVService = require("../services/Nguoitimviec.service");
const getNTV = async (req, res) => {
  try {
    const data = await NTVService.getAllNTV();
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const addNTV = async (req, res) => {
  try {
    const { hoVaTen, ngaySinh, thanhPho, diaChi, gioiTinh, soDienThoai } =
      req.body;

    const anhDaiDien = req.fileUrl;
    const data = await NTVService.createNtv({
      anhDaiDien,
      hoVaTen,
      ngaySinh,
      thanhPho,
      diaChi,
      gioiTinh,
      soDienThoai,
      MaND: 1,
    });
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const delNTV = async (req, res) => {
  try {
    const data = await NTVService.delNtv(req.body);
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const getNtvById = async (req, res) => {
  try {
    const data = await NTVService.getNtvById(req.query.id);
    return res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {}
};
const updateNtv = async (req, res) => {
  try {
    const data = await NTVService.updateNtv(req.body);
    return res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {}
};
module.exports = {
  getNTV,
  addNTV,
  delNTV,
  getNtvById,
  updateNtv,
};
