const db = require("../models/index");
const sequelize = require("../models/index");
const { Op } = require("sequelize");

const getAllNtd = async () => {
  const res = await db.Nhatuyendung.findAll({});
  console.log("🚀 ~ getAllNtd ~ res:", res);
  if (res) {
    return { status: 200, code: 0, message: "success", data: res };
  } else {
    return { status: 500, code: -1, message: "error", data: "" };
  }
};
const getAllNtdtka = async () => {
  const res = await db.Nhatuyendung.findAll({
    include: [
      {
        model: db.Tintuyendung,
        as: "jobPosts", // Alias trong association
        attributes: ["id", "tieude", "mota", "mucluong", "Ngayhethan"], // Chọn cột cần thiết
      },
      {
        model: db.Nguoidung,
        as: "user", // Alias trong association
        attributes: ["id", "email", "username", "Trangthai"], // Chọn cột từ bảng Nguoidung
        include: [
          {
            model: db.Lichsuthanhtoan,
            as: "ND_lstt", // Alias liên kết từ Nguoidung
            attributes: [
              "id",
              "loaiThanhtoan",
              "sotien",
              "Ngaythanhtoan",
              "trangthai",
            ],
            order: [["Ngaythanhtoan", "DESC"]], // Sắp xếp theo ngày thanh toán giảm dần
          },
        ],
      },
    ],
    attributes: ["id", "ten", "email", "sdt", "diachi", "trangthai"], // Chọn cột từ Nhatuyendung
  });
  console.log("🚀 ~ getAllNtd ~ res:", res);
  if (res) {
    return { status: 200, code: 0, message: "success", data: res };
  } else {
    return { status: 500, code: -1, message: "error", data: "" };
  }
};
const countEmployersByField = async () => {
  try {
    const results = await db.Nhatuyendung.findAll({
      attributes: [
        "linhvuc",
        [sequelize.fn("COUNT", sequelize.col("id")), "count"],
      ],
      where: {
        linhvuc: {
          [sequelize.Op.not]: null,
        },
      },
      group: ["linhvuc"],
    });

    return results.map((item) => ({
      linhvuc: item.get("linhvuc") || "Không xác định",
      count: parseInt(item.get("count")),
    }));
  } catch (error) {
    console.error("Lỗi service:", error);
    throw error;
  }
};
const searchNhatuyendung = async (keyword) => {
  try {
    if (!keyword) {
      return {
        status: 200,
        code: 0,
        message: "Thành công",
        data: [],
      };
    }

    const jobPosts = await db.Nhatuyendung.findAll({
      where: {
        // trangthai: "Đã duyệt",
        [Op.or]: [{ ten: { [Op.like]: `%${keyword}%` } }],
      },
    });

    return {
      status: 200,
      code: 0,
      message: "Thành công",
      data: jobPosts,
    };
  } catch (error) {
    console.error("Search job posts error:", error);
    return {
      status: 500,
      code: -1,
      message: "Lỗi nhà tuyển dụng: " + error.message,
      data: null,
    };
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
const findSimilarCompanies = async (name, email) => {
  return await db.Nhatuyendung.findAll({
    where: {
      [Op.or]: [
        { ten: { [Op.like]: `%${name}%` } }, // Tìm tên gần giống
        { email: { [Op.like]: `%${email}%` } }, // Tìm email gần giống
      ],
    },
  });
};

module.exports = {
  getAllNtd,
  getNtdById,
  createNtd,
  updateNtd,
  XoaNtd,
  getNtdByIdNTD,
  updateTrangthaiService,
  getAllNtdtk,
  findSimilarCompanies,
  countEmployersByField,
  searchNhatuyendung,
  getAllNtdtka,
};
