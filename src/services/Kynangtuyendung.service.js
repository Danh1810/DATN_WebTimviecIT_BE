const db = require("../models/index");

const getAllKNtuyendung = async () => {
  const res = await db.Kynangtuyendung.findAll({});
  if (res) {
    return { status: 200, code: 0, message: "success", data: res };
  } else {
    return { status: 500, code: -1, message: "error", data: "" };
  }
};
const createKNtuyendung = async (data) => {
  try {
    const res = await db.Kynangtuyendung.create(data);
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};

const updateKNtuyendung = async (data) => {
  console.log(data);
  const res = await db.Kynangtuyendung.update(data, {
    where: { id: data.id },
  });
  if (res) {
    return { status: 200, code: 0, message: "success", data: res };
  } else {
    return { status: 500, code: -1, message: "error", data: "" };
  }
};
const XoaKNtuyendung = async (id) => {
  const res = await db.Kynangtuyendung.destroy({
    where: { id: id },
  });
  if (res) {
    return { status: 200, code: 0, message: "success", data: res };
  } else {
    return { status: 500, code: -1, message: "error", data: "" };
  }
};

const getKNtuyendungById = async (id) => {
  try {
    const res = await db.Kynangtuyendung.findOne({
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
  getAllKNtuyendung,
  getKNtuyendungById,
  createKNtuyendung,
  updateKNtuyendung,
  XoaKNtuyendung,
};
