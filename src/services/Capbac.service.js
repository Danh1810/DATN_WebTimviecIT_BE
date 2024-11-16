const db = require("../models/index");

const getAllCapbac = async () => {
  const res = await db.Capbac.findAll();
  if (res) {
    return { status: 200, code: 0, message: "success", data: res };
  } else {
    return { status: 500, code: -1, message: "error", data: "" };
  }
};
const createCapbac = async (data) => {
  try {
    const res = await db.Capbac.create(data);
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};

const updateCapbac = async (data) => {
  console.log(data);
  const res = await db.Capbac.update(data, {
    where: { id: data.id },
  });
  if (res) {
    return { status: 200, code: 0, message: "success", data: res };
  } else {
    return { status: 500, code: -1, message: "error", data: "" };
  }
};
const XoaCapbac = async (id) => {
  const res = await db.Capbac.destroy({
    where: { id: id },
  });
  if (res) {
    return { status: 200, code: 0, message: "success", data: res };
  } else {
    return { status: 500, code: -1, message: "error", data: "" };
  }
};

const getCapbacById = async (id) => {
  try {
    const res = await db.Capbac.findOne({
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
  getAllCapbac,
  getCapbacById,
  createCapbac,
  updateCapbac,
  XoaCapbac,
};
