const db = require("../models/index");

const getAllHoso = async () => {
  const res = await db.Hosocanhan.findAll({
    include: [
      {
        model: db.Nguoitimviec,
        as: "nguoitimviec",
      },
    ],
  });
  if (res) {
    return { status: 200, code: 0, message: "success", data: res };
  } else {
    return { status: 500, code: -1, message: "error", data: "" };
  }
};
const getAllHosoID = async (id) => {
  const res = await db.Hosocanhan.findAll({
    where: { id: id },
    include: [
      {
        models: db.Nguoitimviec,
        as: "nguoitimviec",
      },
    ],
  });
  if (res) {
    return { status: 200, code: 0, message: "success", data: res };
  } else {
    return { status: 500, code: -1, message: "error", data: "" };
  }
};
const createHoso = async (data) => {
  console.log("🚀 ~ createHoso ~ data:", data);
  try {
    const res = await db.Hosocanhan.create(data);
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};

const updateHoso = async (data) => {
  console.log(data);
  const res = await db.Hosocanhan.update(data, {
    where: { id: data.id },
  });
  if (res) {
    return { status: 200, code: 0, message: "success", data: res };
  } else {
    return { status: 500, code: -1, message: "error", data: "" };
  }
};

const XoaHoso = async (id) => {
  const res = await db.Hosocanhan.destroy({
    where: { id: id },
  });
  if (res) {
    return { status: 200, code: 0, message: "success", data: res };
  } else {
    return { status: 500, code: -1, message: "error", data: "" };
  }
};

const getHosoById = async (id) => {
  console.log("🚀 ~ getHosoById ~ id:", id);
  try {
    const res = await db.Hosocanhan.findOne({
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
  getAllHoso,
  getHosoById,
  createHoso,
  updateHoso,
  XoaHoso,
  getAllHosoID,
};
