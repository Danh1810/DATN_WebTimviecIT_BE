const { getAllTintd } = require("../controller/TintdController");
const db = require("../models/index");

const getAllNtd = async () => {
  const res = await db.Nhatuyendung.findAll({});
  if (res) {
    return { status: 200, code: 0, message: "success", data: res };
  } else {
    return { status: 500, code: -1, message: "error", data: "" };
  }
};
const createNtd = async (data) => {
  try {
    const res = await db.Nhatuyendung.create(data);
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};

const updateNtd = async (data) => {
  console.log(data);
  const res = await db.Nhatuyendung.update(data, {
    where: { id: data.id },
  });
  if (res) {
    return { status: 200, code: 0, message: "success", data: res };
  } else {
    return { status: 500, code: -1, message: "error", data: "" };
  }
};

const XoaNtd = async (id) => {
  const res = await db.Nhatuyendung.destroy({
    where: { id: id },
  });
  if (res) {
    return { status: 200, code: 0, message: "success", data: res };
  } else {
    return { status: 500, code: -1, message: "error", data: "" };
  }
};

const getNtdById = async (id) => {
  try {
    const res = await db.Nhatuyendung.findOne({
      where: { MaND: id },
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
const getNtdByIdNTD = async (id) => {
  console.log("🚀 ~ getNtdByIdNTD ~ id:", id);
  try {
    const res = await db.Nhatuyendung.findOne({
      where: { id: id },
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
  getAllNtd,
  getNtdById,
  createNtd,
  updateNtd,
  XoaNtd,
  getAllTintd,
  getNtdByIdNTD,
};
