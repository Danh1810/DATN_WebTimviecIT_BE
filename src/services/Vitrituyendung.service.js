const db = require("../models/index");

const getAllVttuyendung = async () => {
  const res = await db.Vitrituyendung.findAll({});
  if (res) {
    return { status: 200, code: 0, message: "success", data: res };
  } else {
    return { status: 500, code: -1, message: "error", data: "" };
  }
};
const createVttuyendung = async (data) => {
  try {
    const res = await db.Vitrituyendung.create(data);
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};

const updateVttuyendung = async (data) => {
  console.log(data);
  const res = await db.Vitrituyendung.update(data, {
    where: { id: data.id },
  });
  if (res) {
    return { status: 200, code: 0, message: "success", data: res };
  } else {
    return { status: 500, code: -1, message: "error", data: "" };
  }
};
const XoaVttuyendung = async (id) => {
  const res = await db.Vitrituyendung.destroy({
    where: { id: id },
  });
  if (res) {
    return { status: 200, code: 0, message: "success", data: res };
  } else {
    return { status: 500, code: -1, message: "error", data: "" };
  }
};

const getVttuyendungById = async (id) => {
  try {
    const res = await db.Vitrituyendung.findOne({
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
  getAllVttuyendung,
  getVttuyendungById,
  createVttuyendung,
  updateVttuyendung,
  XoaVttuyendung,
};
