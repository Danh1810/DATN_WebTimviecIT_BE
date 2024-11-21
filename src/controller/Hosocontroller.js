const HosoService = require("../services/HosoService");

const getAllHoso = async (req, res) => {
  try {
    const data = await HosoService.getAllHoso();
    res.status(data.status).json({
      code: data.code,
      message: data.message,
      data: data.data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal Server Error",
      code: -1,
      data: "",
    });
  }
};

const createHoso = async (req, res) => {
  try {
    const data = await HosoService.createHoso(req.body);
    res.status(data.status).json({
      code: data.code,
      message: data.message,
      data: data.data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal Server Error",
      code: -1,
      data: "",
    });
  }
};

const updateHoso = async (req, res) => {
  try {
    const data = await HosoService.updateHoso(req.body);
    res.status(data.status).json({
      code: data.code,
      message: data.message,
      data: data.data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal Server Error",
      code: -1,
      data: "",
    });
  }
};

const XoaHoso = async (req, res) => {
  try {
    const data = await HosoService.XoaHoso(req.params.id);
    res.status(data.status).json({
      code: data.code,
      message: data.message,
      data: data.data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal Server Error",
      code: -1,
      data: "",
    });
  }
};

const getHosoById = async (req, res) => {
  try {
    const data = await HosoService.getHosoById(req.params.id);
    res.status(data.status).json({
      code: data.code,
      message: data.message,
      data: data.data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal Server Error",
      code: -1,
      data: "",
    });
  }
};

module.exports = {
  getAllHoso,
  createHoso,
  updateHoso,
  XoaHoso,
  getHosoById,
};
