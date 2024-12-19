const LsttService = require("../services/LsThanhtoan.service");
const db = require("../models/index");
const { sequelize } = require("../models/index");
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
    const data = await LsttService.getLSTTByNTDId(req.query.id);
    console.log("🚀 ~ getLsttByNTDId ~ data:", data);
    return res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {}
};
const getTotalRevenue = async (req, res) => {
  try {
    // Truy vấn trực tiếp tổng doanh thu từ cơ sở dữ liệu
    const [results] = await sequelize.query(
      "SELECT SUM(sotien) AS totalRevenue FROM Lichsuthanhtoan"
    );

    const totalRevenue = results[0]?.totalRevenue || 0;

    console.log("🚀 ~ getTotalRevenue ~ totalRevenue:", totalRevenue);

    // Trả về kết quả
    return res.status(200).json({
      code: 200,
      message: "Total revenue fetched successfully",
      data: { totalRevenue: parseFloat(totalRevenue).toFixed(2) },
    });
  } catch (error) {
    console.error("🚀 ~ getTotalRevenue ~ error:", error);

    return res.status(500).json({
      code: 500,
      message: "Internal Server Error",
      data: null,
    });
  }
};

const getTotalRevenueByNTT = async (req, res) => {
  try {
    const { MaNTT } = req.query.id; // Lấy `MaNTT` từ query parameters

    if (!MaNTT) {
      return res.status(400).json({
        code: 400,
        message: "MaNTT is required",
        data: null,
      });
    }

    // Truy vấn tổng doanh thu của một NTT
    const [results] = await sequelize.query(
      "SELECT SUM(sotien) AS totalRevenue FROM Lichsuthanhtoan WHERE MaNTT = :MaNTT",
      {
        replacements: { MaNTT },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    const totalRevenue = results?.totalRevenue || 0;

    console.log("🚀 ~ getTotalRevenueByNTT ~ totalRevenue:", totalRevenue);

    // Trả về kết quả
    return res.status(200).json({
      code: 200,
      message: "Total revenue fetched successfully",
      data: { totalRevenue: parseFloat(totalRevenue).toFixed(2) },
    });
  } catch (error) {
    console.error("🚀 ~ getTotalRevenueByNTT ~ error:", error);

    return res.status(500).json({
      code: 500,
      message: "Internal Server Error",
      data: null,
    });
  }
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
  getTotalRevenue,
  getTotalRevenueByNTT,
};
