const phanHoiService = require("../services/Phanhoi");
const db = require("../models/index");

const getAllPhanHoi = async (req, res) => {
  try {
    const result = await phanHoiService.getAllPhanHoi();
    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Server error",
      error: error.message,
    });
  }
};

const getPhanHoiByUngTuyen = async (req, res) => {
  const idUngTuyen = req.params.idUngTuyen;
  try {
    const result = await phanHoiService.getPhanHoiByUngTuyen(idUngTuyen);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Server error",
      error: error.message,
    });
  }
};

const getPhanHoiById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await phanHoiService.getPhanHoiById(id);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Server error",
      error: error.message,
    });
  }
};

const createPhanHoi = async (req, res) => {
  const { idUngTuyen, noiDung } = req.body;
  console.log("🚀 ~ createPhanHoi ~ req.body:", req.body);
  const filedinhkem = req.fileUrl;

  try {
    const result = await phanHoiService.createPhanHoi({
      idUngTuyen,
      noiDung,
      filedinhkem,
    });
    const data = await db.Ungtuyen.update(
      { trangthai: "Đã phản hồi" },
      {
        where: {
          id: idUngTuyen,
        },
      }
    );
    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Server error",
      error: error.message,
    });
  }
};

const updatePhanHoi = async (req, res) => {
  const data = req.body;
  try {
    const result = await phanHoiService.updatePhanHoi(data);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Server error",
      error: error.message,
    });
  }
};

const deletePhanHoi = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await phanHoiService.deletePhanHoi(id);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  getAllPhanHoi,
  getPhanHoiByUngTuyen,
  getPhanHoiById,
  createPhanHoi,
  updatePhanHoi,
  deletePhanHoi,
};
