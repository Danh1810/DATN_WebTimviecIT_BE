const { getAllTintd } = require("../controller/TintdController");
const db = require("../models/index");

const getAllNtd = async () => {
  const res = await db.Nhatuyendung.findAll({});
  console.log("🚀 ~ getAllNtd ~ res:", res);
  if (res) {
    return { status: 200, code: 0, message: "success", data: res };
  } else {
    return { status: 500, code: -1, message: "error", data: "" };
  }
};
const getAllNtdtk = async (id) => {
  const employer = await db.Nhatuyendung.findAll({
    where: { MaND: id },
    include: [
      {
        model: db.Tintuyendung,
        as: "jobPosts",
        include: [
          {
            model: db.Kynang,
            as: "skills",
            through: { attributes: [] }, // Không hiển thị bảng trung gian
            attributes: ["ten"], // Lấy tên các kỹ năng
          },
          {
            model: db.Capbac,
            as: "levels",
            through: { attributes: [] }, // Không hiển thị bảng trung gian
            attributes: ["ten"], // Lấy tên các cấp bậc
          },
          {
            model: db.Ungtuyen,
            as: "jbp",
            include: [
              {
                model: db.Hosocanhan,
                as: "UT_NTV", // Hồ sơ cá nhân của ứng viên
              },
            ],
          },
        ],
      },
    ],
  });

  if (employer) {
    return { status: 200, code: 0, message: "success", data: employer };
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
const updateTrangthaiService = async (data) => {
  // Tìm kiếm tin tuyển dụng
  try {
    const res = await db.Nhatuyendung.update(
      {
        trangthai: "Đã duyệt",
      },
      {
        where: { id: data.id },
      }
    );
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
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
  console.log("🚀 ~ getNtdById ~ id:", id);
  try {
    const res = await db.Nhatuyendung.findOne({
      where: { MaND: id },
    });
    console.log("🚀 ~ getNtdById ~ res:", res);
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
  updateTrangthaiService,
  getAllNtdtk,
};
