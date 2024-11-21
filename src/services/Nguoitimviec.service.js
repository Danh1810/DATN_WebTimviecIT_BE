const db = require("../models/index");

const getAllNTV = async () => {
  const res = await db.Nguoitimviec.findAll({});
  if (res) {
    return { status: 200, code: 0, message: "success", data: res };
  } else {
    return { status: 500, code: -1, message: "error", data: "" };
  }
};
const getAllNTVhoso = async (id) => {
  const res = await db.Nguoitimviec.findAll({
    where: { id: id },
    include: [
      {
        model: db.Hosocanhan,
        as: "hoso",
      },
    ],
  });
  if (res) {
    return { status: 200, code: 0, message: "success", data: res };
  } else {
    return { status: 500, code: -1, message: "error", data: "" };
  }
};
const createNtv = async (data) => {
  try {
    const res = await db.Nguoitimviec.create(data);
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};

const updateNtv = async (data) => {
  console.log(data);
  const res = await db.Nguoitimviec.update(data, {
    where: { id: data.id },
  });
  if (res) {
    return { status: 200, code: 0, message: "success", data: res };
  } else {
    return { status: 500, code: -1, message: "error", data: "" };
  }
};
const XoaNtv = async (id) => {
  const res = await db.Nguoitimviec.destroy({
    where: { id: id },
  });
  if (res) {
    return { status: 200, code: 0, message: "success", data: res };
  } else {
    return { status: 500, code: -1, message: "error", data: "" };
  }
};

const getNtvById = async (id) => {
  try {
    const res = await db.Nguoitimviec.findOne({
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
  getAllNTV,
  getNtvById,
  createNtv,
  updateNtv,
  XoaNtv,
  getAllNTVhoso,
};
