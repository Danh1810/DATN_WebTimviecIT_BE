const db = require("../models/index");

const getAllNguoidung = async () => {
  try {
    const res = await db.Nguoidung.findAll({
      include: [
        {
          model: db.Quyen,
          as: "Group",
          attributes: ["ten"],
        },
      ],
    });
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
const getNguoidungById = async (id) => {
  try {
    const res = await db.Nguoidung.findOne({
      where: { id: id },
      include: [
        {
          model: db.Quyen,
          as: "Group",
          attributes: ["ten"],
        },
      ],
    });
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
const getNguoidungByUsername = async (username) => {
  if (!username) {
    return { status: 400, code: 1, message: "Invalid username", data: "" };
  }

  try {
    const res = await db.Nguoidung.findOne({
      where: { username: username },
      include: [
        {
          model: db.Quyen,
          as: "Group",
          attributes: ["ten"],
        },
      ],
    });

    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 404, code: 1, message: "User not found", data: "" };
    }
  } catch (error) {
    return {
      status: 500,
      code: -1,
      message: error.message || "Internal Server Error",
      data: "",
    };
  }
};

const createNguoidung = async (data) => {
  try {
    const newUser = await db.Nguoidung.create(data);
    return { status: 200, code: 0, message: "success", data: newUser };
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};

const updateNguoidung = async (id, data) => {
  try {
    // Find the MaQuyen based on the tenQuyen provided in the data
    const role = await db.Nguoidung.findOne({
      where: { tenQuyen: data.tenQuyen },
      attributes: ["MaQuyen"],
    });

    if (!role) {
      return { status: 404, code: 1, message: "Role not found", data: "" };
    }

    // Update Nguoidung with the found MaQuyen
    const [updatedRows] = await db.Nguoidung.update(
      {
        ...data,
        MaQuyen: role.MaQuyen, // Replace tenQuyen with the actual MaQuyen
      },
      {
        where: { id },
      }
    );

    if (updatedRows === 0) {
      return {
        status: 404,
        code: 1,
        message: "User not found or no changes made",
        data: "",
      };
    }

    // Return success message with updated user data
    return {
      status: 200,
      code: 0,
      message: "success",
      data: { id, ...data, MaQuyen: role.MaQuyen },
    };
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};

const Duyettaikhoan = async (data) => {
  console.log(data);
  try {
    const res = await db.Nguoidung.update(
      {
        Trangthai: data.Trangthai,
      },
      { where: { id: data.id } }
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

module.exports = {
  getAllNguoidung,
  getNguoidungById,
  updateNguoidung,
  Duyettaikhoan,
  createNguoidung,
  getNguoidungByUsername,
};
