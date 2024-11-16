const db = require("../models/index");

const getAllQuyen = async () => {
  const res = await db.Quyen.findAll({
    order: [["URL", "ASC"]],
  });
  if (res) {
    return { status: 200, code: 0, message: "success", data: res };
  } else {
    return { status: 500, code: -1, message: "error", data: "" };
  }
};
const getdk = async () => {
  try {
    const res = await db.Quyen.findAll({
      where: {
        id: [2, 3], // Lọc các bản ghi có id là 2 hoặc 3
      },
      order: [["URL", "ASC"]],
    });

    if (res && res.length > 0) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 404, code: -1, message: "No data found", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: "error", data: error.message };
  }
};

const createQuyen = async (data) => {
  try {
    const res = await db.Quyen.create(data);
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};

const updateQuyen = async (data) => {
  console.log(data);
  const res = await db.Quyen.update(data, {
    where: { id: data.id },
  });
  if (res) {
    return { status: 200, code: 0, message: "success", data: res };
  } else {
    return { status: 500, code: -1, message: "error", data: "" };
  }
};
const XoaQuyen = async (id) => {
  const res = await db.Quyen.destroy({
    where: { id: id },
  });
  if (res) {
    return { status: 200, code: 0, message: "success", data: res };
  } else {
    return { status: 500, code: -1, message: "error", data: "" };
  }
};

const getQuyenById = async (id) => {
  try {
    const res = await db.Quyen.findOne({
      where: { id: id },
      attributes: ["id", "URL", "description"],
    });
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 500, code: -1, message: "error", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: "error", data: "" };
  }
};

module.exports = {
  getAllQuyen,
  getQuyenById,
  updateQuyen,
  XoaQuyen,
  createQuyen,
  getdk,
};
