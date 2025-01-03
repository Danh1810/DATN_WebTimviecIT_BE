const db = require("../models/index"); // Gồm models và sequelize instance
const { Op, where } = require("sequelize"); // Các toán tử của Sequelize
const { sequelize } = db; // Lấy instance sequelize từ db

const getAllTintd = async () => {
  console.log("sdad");

  // Fetch the user from the database based on username and include their associated role (Group)
  const jbp = await db.Tintuyendung.findAll({
    // order: sequelize.random(),
    order: [["Ngaytao", "DESC"]],
    where: {
      trangthai: "Đã duyệt",
    },
    include: [
      {
        model: db.Nhatuyendung, // Assuming Roles is the table for user roles
        as: "employer", // Ensure that 'as' matches the alias defined in your model associations
      },
      {
        model: db.Kynang, // Assuming Roles is the table for user roles
        as: "skills",
        through: { attributes: [] }, // Không hiển thị bảng trung gian
        attributes: ["ten"], // Lấy tên các kỹ năng   // Ensure that 'as' matches the alias defined in your model associations
      },
      {
        model: db.Capbac, // Assuming Roles is the table for user roles
        as: "levels",
        through: { attributes: [] }, // Không hiển thị bảng trung gian
        attributes: ["ten"], // Lấy tên các kỹ năng   // Ensure that 'as' matches the alias defined in your model associations
      },
    ],
  });

  if (jbp) {
    return { status: 200, code: 0, message: "success", data: jbp };
  } else {
    return { status: 500, code: -1, message: "error", data: "" };
  }
};
const getAllTintdadmin = async () => {
  console.log("sdad");

  // Fetch the user from the database based on username and include their associated role (Group)
  const jbp = await db.Tintuyendung.findAll({
    order: [["Ngaytao", "DESC"]],
    include: [
      {
        model: db.Nhatuyendung, // Assuming Roles is the table for user roles
        as: "employer", // Ensure that 'as' matches the alias defined in your model associations
      },
      {
        model: db.Kynang, // Assuming Roles is the table for user roles
        as: "skills",
        through: { attributes: [] }, // Không hiển thị bảng trung gian
        attributes: ["ten"], // Lấy tên các kỹ năng   // Ensure that 'as' matches the alias defined in your model associations
      },
      {
        model: db.Capbac, // Assuming Roles is the table for user roles
        as: "levels",
        through: { attributes: [] }, // Không hiển thị bảng trung gian
        attributes: ["ten"], // Lấy tên các kỹ năng   // Ensure that 'as' matches the alias defined in your model associations
      },
    ],
  });

  if (jbp) {
    return { status: 200, code: 0, message: "success", data: jbp };
  } else {
    return { status: 500, code: -1, message: "error", data: "" };
  }
};
const getAllTintdcd = async () => {
  // Fetch the user from the database based on username and include their associated role (Group)
  const jbp = await db.Tintuyendung.findAll({
    order: [["Ngaytao", "DESC"]],
    where: {
      trangthai: "Chờ duyệt",
    },
    include: [
      {
        model: db.Nhatuyendung, // Assuming Roles is the table for user roles
        as: "employer", // Ensure that 'as' matches the alias defined in your model associations
      },
      {
        model: db.Kynang, // Assuming Roles is the table for user roles
        as: "skills",
        through: { attributes: [] }, // Không hiển thị bảng trung gian
        attributes: ["ten"], // Lấy tên các kỹ năng   // Ensure that 'as' matches the alias defined in your model associations
      },
      {
        model: db.Capbac, // Assuming Roles is the table for user roles
        as: "levels",
        through: { attributes: [] }, // Không hiển thị bảng trung gian
        attributes: ["ten"], // Lấy tên các kỹ năng   // Ensure that 'as' matches the alias defined in your model associations
      },
    ],
  });

  if (jbp) {
    return { status: 200, code: 0, message: "success", data: jbp };
  } else {
    return { status: 500, code: -1, message: "error", data: "" };
  }
};
const getAllTintdcdByEmployer = async (employerId) => {
  try {
    // Fetch job posts for the specified employer
    const jobPosts = await db.Tintuyendung.findAll({
      order: [["Ngaytao", "DESC"]], // Sort by creation date in descending order
      where: {
        MaNTD: employerId, // Filter by employer ID
      },
      include: [
        {
          model: db.Nhatuyendung,
          as: "employer", // Alias for the employer
        },
        {
          model: db.Kynang, // Skills required for the job
          as: "skills",
          through: { attributes: [] }, // Exclude intermediate table
          attributes: ["ten"], // Fetch skill names only
        },
        {
          model: db.Capbac, // Job levels
          as: "levels",
          through: { attributes: [] }, // Exclude intermediate table
          attributes: ["ten"], // Fetch level names only
        },
      ],
    });

    // Return response
    if (jobPosts) {
      return { status: 200, code: 0, message: "success", data: jobPosts };
    } else {
      return { status: 404, code: 1, message: "No job posts found", data: [] };
    }
  } catch (error) {
    // Handle errors
    console.error("Error fetching job posts:", error);
    return { status: 500, code: -1, message: "error", data: error.message };
  }
};

const getTinTdByID = async (id) => {
  // Fetch the user from the database based on username and include their associated role (Group)
  const jbp = await db.Tintuyendung.findOne({
    where: { id: id },

    include: [
      {
        model: db.Nhatuyendung, // Assuming Roles is the table for user roles
        as: "employer", // Ensure that 'as' matches the alias defined in your model associations
      },
      {
        model: db.Kynang, // Assuming Roles is the table for user roles
        as: "skills",
        through: { attributes: [] }, // Không hiển thị bảng trung gian
        attributes: ["ten"], // Lấy tên các kỹ năng   // Ensure that 'as' matches the alias defined in your model associations
      },
      {
        model: db.Capbac, // Assuming Roles is the table for user roles
        as: "levels",
        through: { attributes: [] }, // Không hiển thị bảng trung gian
        attributes: ["ten"], // Lấy tên các kỹ năng   // Ensure that 'as' matches the alias defined in your model associations
      },
    ],
  });
  console.log("fdsf", jbp.dataValues);
  if (jbp) {
    return { status: 200, code: 0, message: "success", data: jbp.dataValues };
  } else {
    return { status: 500, code: -1, message: "error", data: "" };
  }
};
const updateTrangthaiService = async (data) => {
  // Tìm kiếm tin tuyển dụng
  try {
    const res = await db.Tintuyendung.update(
      {
        trangthai: "Đã duyệt",
      },
      {
        where: { id: data.id },
      }
    );
    if (res) {
      return { status: 200, code: 0, message: "success", data: "" };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
const updateTrangthaiServicetc = async (data) => {
  try {
    const res = await db.Tintuyendung.update(
      {
        trangthai: "Đã từ chối",
      },
      {
        where: { id: data.id },
      }
    );
    if (res) {
      return { status: 200, code: 0, message: "success", data: "" };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
const updateTrangthaiServiceAnorGiahan = async (data) => {
  console.log("🚀 ~ updateTrangthaiServiceAnorGiahan ~ data:", data);
  try {
    const post = await db.Tintuyendung.findOne({
      where: { id: data.id },
    });
    console.log("🚀 ~ updateTrangthaiServiceAnorGiahan ~ post:", post);

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy bài đăng" });
    }

    if (post.trangthai === "Đã duyệt") {
      post.trangthai = "Tạm dừng";
    } else {
      post.trangthai = "Đã duyệt";
      post.ngayHetHan = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // +30 days
    }

    await post.save();
    if (post) {
      return { status: 200, code: 0, message: "success", data: post };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
const searchTinTDd = async (keyword) => {
  try {
    if (!keyword) {
      return {
        status: 200,
        code: 0,
        message: "Thành công",
        data: [],
      };
    }

    const jobPosts = await db.Tintuyendung.findAll({
      include: [
        {
          model: db.Kynang,
          as: "skills",
          attributes: ["ten"],
          through: { attributes: [] },
          required: false,
        },
        {
          model: db.Nhatuyendung,
          as: "employer",
          required: false,
        },
        {
          model: db.Capbac,
          as: "levels",
          attributes: ["ten"],
          through: { attributes: [] },
          required: false,
        },
      ],
      where: {
        [Op.or]: [
          { tieude: { [Op.like]: `%${keyword}%` } },
          { "$skills.ten$": { [Op.like]: `%${keyword}%` } },
          { "$employer.ten$": { [Op.like]: `%${keyword}%` } },
          { "$levels.ten$": { [Op.like]: `%${keyword}%` } },
        ],
      },
      order: [["Ngaytao", "DESC"]],
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
      message: "Lỗi tìm kiếm tin tuyển dụng: " + error.message,
      data: null,
    };
  }
};

const getTtd = async () => {
  const res = await db.Tintuyendung.findAll({});
  if (res) {
    return { status: 200, code: 0, message: "success", data: res };
  } else {
    return { status: 500, code: -1, message: "error", data: "" };
  }
};
const createTtd = async (data) => {
  try {
    const res = await db.Tintuyendung.create(data);
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};

const updateTtd = async (data) => {
  console.log("🚀 ~ updateTtd ~ data:", data);

  const res = await db.Tintuyendung.update(data, {
    where: { id: data.id },
  });
  if (res) {
    return { status: 200, code: 0, message: "success", data: res };
  } else {
    return { status: 500, code: -1, message: "error", data: "" };
  }
};
const XoaTtd = async (id) => {
  const res = await db.Tintuyendung.destroy({
    where: { id: id },
  });
  console.log("🚀 ~ XoaTtd ~ id:", id);
  if (res) {
    return { status: 200, code: 0, message: "success", data: res };
  } else {
    return { status: 500, code: -1, message: "error", data: "" };
  }
};

const getTtdById = async (data) => {
  try {
    const res = await db.Tintuyendung.findOne({
      where: { id: data },
      include: [
        {
          model: db.Nhatuyendung, // Assuming Roles is the table for user roles
          as: "employer", // Ensure that 'as' matches the alias defined in your model associations
        },
        {
          model: db.Kynang, // Assuming Roles is the table for user roles
          as: "skills",
          through: { attributes: [] }, // Không hiển thị bảng trung gian
          attributes: ["ten"], // Lấy tên các kỹ năng   // Ensure that 'as' matches the alias defined in your model associations
        },

        {
          model: db.Capbac, // Assuming Roles is the table for user roles
          as: "levels",
          through: { attributes: [] }, // Không hiển thị bảng trung gian
          attributes: ["ten"], // Lấy tên các kỹ năng   // Ensure that 'as' matches the alias defined in your model associations
        },
      ],
    });
    console.log("🚀 ~ getTtdById ~ id:", data);
    console.log("res", res);
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 500, code: -1, message: "error", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: "error", data: "" };
  }
};
const updateExpiredJobs = async () => {
  try {
    const currentDate = new Date();

    // Find all jobs that have expired but haven't been marked as expired
    const expiredJobs = await db.Tintuyendung.update(
      {
        trangthai: "Đã hết hạn",
      },
      {
        where: {
          Ngayhethan: {
            [Op.lt]: currentDate, // Less than current date
          },
          trangthai: {
            [Op.ne]: "Đã hết hạn", // Not already marked as expired
          },
        },
      }
    );

    return {
      success: true,
      message: `Updated ${expiredJobs[0]} expired job postings`,
      updatedCount: expiredJobs[0],
    };
  } catch (error) {
    console.error("Error updating expired jobs:", error);
    return {
      success: false,
      message: "Error updating expired jobs",
      error: error.message,
    };
  }
};

module.exports = {
  getAllTintd,
  getTinTdByID,
  searchTinTDd,
  getTtd,
  getTtdById,
  createTtd,
  updateTtd,
  XoaTtd,
  getAllTintdcd,
  updateTrangthaiService,
  getAllTintdcdByEmployer,
  getAllTintdadmin,
  updateExpiredJobs,
  updateTrangthaiServicetc,
  updateTrangthaiServiceAnorGiahan,
};
