const db = require("../models/index");

const getAllUT = async () => {
  const res = await db.Ungtuyen.findAll({});
  if (res) {
    return { status: 200, code: 0, message: "success", data: res };
  } else {
    return { status: 500, code: -1, message: "error", data: "" };
  }
};
const layTatCaHSTheoTTD = async (id) => {
  console.log("🚀 ~ layTatCaHSTheoTTD ~ id:", id);
  const res = await db.Ungtuyen.findAll({
    where: {
      MaTTD: id,
    },
    include: [
      {
        model: db.Hosocanhan,
        as: "UT_NTV", // Tên alias đã khai báo trong associate
      },
    ],
  });
  if (res) {
    console.log("🚀 ~ layTatCaHSTheoTTD ~ res:", res);
    return { status: 200, code: 0, message: "success", data: res };
  } else {
    return { status: 500, code: -1, message: "error", data: "" };
  }
};
const layTatCaHSTheoNTV = async (id) => {
  console.log("🚀 ~ layTatCaHSTheoTTD ~ id:", id);
  const res = await db.Ungtuyen.findAll({
    include: [
      {
        model: db.Hosocanhan,
        as: "UT_NTV",
        where: { NguoitimviecId: id }, // Lọc theo ID người tìm việc
      },
      {
        model: db.Tintuyendung,
        as: "UT_TTD",
      },
    ],
  });
  if (res) {
    console.log("🚀 ~ layTatCaHSTheoTTD ~ res:", res);
    return { status: 200, code: 0, message: "success", data: res };
  } else {
    return { status: 500, code: -1, message: "error", data: "" };
  }
};
const createUT = async (data) => {
  try {
    const res = await db.Ungtuyen.create(data);
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};

const updateUT = async (data) => {
  console.log(data);
  const res = await db.Ungtuyen.update(data, {
    where: { id: data.id },
  });
  if (res) {
    return { status: 200, code: 0, message: "success", data: res };
  } else {
    return { status: 500, code: -1, message: "error", data: "" };
  }
};
const XoaUT = async (id) => {
  const res = await db.Ungtuyen.destroy({
    where: { id: id },
  });
  if (res) {
    return { status: 200, code: 0, message: "success", data: res };
  } else {
    return { status: 500, code: -1, message: "error", data: "" };
  }
};

const getUTById = async (id) => {
  try {
    const res = await db.Ungtuyen.findOne({
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
  getAllUT,
  getUTById,
  createUT,
  updateUT,
  XoaUT,
  layTatCaHSTheoTTD,
  layTatCaHSTheoNTV,
};
