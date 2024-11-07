const db = require("../models/index");
const { Op } = require("sequelize");

const getAllTintd = async () => {
  console.log("sdad");

  // Fetch the user from the database based on username and include their associated role (Group)
  const jbp = await db.Tintuyendung.findAll({
    include: [
      {
        model: db.Nhatuyendung, // Assuming Roles is the table for user roles
        as: "employer", // Ensure that 'as' matches the alias defined in your model associations
      },
      {
        model: db.Kynang, // Assuming Roles is the table for user roles
        as: "skills",
        through: { attributes: [] }, // Không hiển thị bảng trung gian
        attributes: ["id", "ten"], // Lấy tên các kỹ năng   // Ensure that 'as' matches the alias defined in your model associations
      },
      {
        model: db.Capbac, // Assuming Roles is the table for user roles
        as: "levels",
        through: { attributes: [] }, // Không hiển thị bảng trung gian
        attributes: ["id", "ten"], // Lấy tên các kỹ năng   // Ensure that 'as' matches the alias defined in your model associations
      },
    ],
  });
  console.log("🚀 ~ getAllJobpost ~ jbp:", jbp);

  console.log("sasd", JSON.stringify(jbp, null, 2));
  if (jbp) {
    return { status: 200, code: 0, message: "success", data: jbp };
  } else {
    return { status: 500, code: -1, message: "error", data: "" };
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
      // {
      //   model: db.Kynang, // Assuming Roles is the table for user roles
      //   as :'skill',
      //   through: { attributes: [] }, // Không hiển thị bảng trung gian
      //   // attributes: ['name'] // Lấy tên các kỹ năng    // Ensure that 'as' matches the alias defined in your model associations
      // },{
      //   model: db.Capbac, // Assuming Roles is the table for user roles
      //   as : 'level',
      //   through: { attributes: [] }, // Không hiển thị bảng trung gian
      //   // attributes: ['name'] // Lấy tên các kỹ năng   // Ensure that 'as' matches the alias defined in your model associations
      // },
    ],
  });
  console.log("fdsf", jbp);
  if (jbp) {
    return { status: 200, code: 0, message: "success", data: jbp };
  } else {
    return { status: 500, code: -1, message: "error", data: "" };
  }
};
const searchTinTDd = async (keyword) => {
  const jobPosts = await db.Tintuyendung.findAll({
    include: [
      {
        model: db.Kynang,
        as: "skill",
        // where: keyword ? { name: { [Op.like]: `%${keyword}%` } } : {},
        attributes: ["name"],
        through: { attributes: [] },
        required: false, // Không bắt buộc phải có Skills
      },
      {
        model: db.Nhatuyendung,
        as: "employer",
        // where: keyword ? { name: { [Op.like]: `%${keyword}%` } } : {},
        required: false, // Không bắt buộc phải có Employers
      },
    ],
    where: {
      [Op.or]: [
        // Nếu có Skills phù hợp
        {
          "$skill.name$": { [Op.like]: `%${keyword}%` },
        },
        // Nếu có Employers phù hợp
        {
          "$employer.name$": { [Op.like]: `%${keyword}%` },
        },
      ],
    },
  });
  console.log("serchec", jobPosts);

  if (jobPosts) {
    return { status: 200, code: 0, message: "Thành công", data: jobPosts };
  } else {
    return { status: 500, code: -1, message: "Lỗi", data: "" };
  }
};

module.exports = { getAllTintd, getTinTdByID, searchTinTDd };
