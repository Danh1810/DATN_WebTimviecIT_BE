const db = require("../models/index");

// Lấy tất cả phản hồi
const getAllPhanHoi = async () => {
  try {
    const res = await db.PhanHoiUngTuyen.findAll({});
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 500, code: -1, message: "No data found", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};

// Lấy tất cả phản hồi theo ứng tuyển (idUngTuyen)
const getPhanHoiByUngTuyen = async (idUngTuyen) => {
  try {
    const res = await db.PhanHoiUngTuyen.findAll({
      where: { idUngTuyen: idUngTuyen },
    });
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 404, code: -1, message: "No feedback found", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};

// Lấy phản hồi chi tiết theo ID
const getPhanHoiById = async (id) => {
  try {
    const res = await db.PhanHoiUngTuyen.findOne({
      where: { id },
    });
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 404, code: -1, message: "Feedback not found", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};

// Tạo phản hồi mới
const createPhanHoi = async (data) => {
  try {
    const res = await db.PhanHoiUngTuyen.create(data);
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return {
        status: 500,
        code: 1,
        message: "Failed to create feedback",
        data: "",
      };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};

// Cập nhật phản hồi
const updatePhanHoi = async (data) => {
  try {
    const res = await db.PhanHoiUngTuyen.update(data, {
      where: { id: data.id },
    });
    if (res[0] > 0) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 404, code: -1, message: "Feedback not found", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};

// Xóa phản hồi
const deletePhanHoi = async (id) => {
  try {
    const res = await db.PhanHoiUngTuyen.destroy({
      where: { id },
    });
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 404, code: -1, message: "Feedback not found", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
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
