const ntdService = require("../services/Nhatd.service");

const getAllNtd = async (req, res) => {
  try {
    const data = await ntdService.getAllNtd();
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
// Assuming the model is in a folder named models
const addNtd = async (req, res) => {
  try {
    console.log("repbody", req.body);
    const { ten, email, sdt, website, linhvuc, diachi, MaND, Soluongdangbai } =
      req.body;
    const logo = req.fileUrl;
    const newNtd = await ntdService.createNtd({
      ten,
      email,
      sdt,
      website,
      linhvuc,
      diachi,
      MaND: MaND,
      logo,
      Soluongdangbai: Soluongdangbai || 3, // Default to 0 if not provided
    });

    // Return a success response
    res.status(201).json({
      code: 0,
      message: "Employer added successfully.",
      data: newNtd,
    });
  } catch (error) {
    console.error("Error adding employer:", error);

    // Handle specific Sequelize validation errors
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        code: -1,
        message: error.errors.map((err) => err.message).join(", "),
        data: "",
      });
    }

    // Handle unexpected errors
    res.status(500).json({
      code: -1,
      message: "Internal Server Error",
      data: "",
    });
  }
};

const updateNtd = async (req, res) => {
  try {
    const { id, ten, email, sdt, website, linhvuc, diachi } = req.body;
    console.log("🚀 ~ updateNtd ~ eq.body;:", req.body);
    const logo = req.fileUrl;
    const data = await ntdService.updateNtd({
      id,
      ten,
      email,
      sdt,
      website,
      linhvuc,
      diachi,
      logo,
    });
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};

const deleteNtd = async (req, res) => {
  try {
    const data = await ntdService.XoaNtd(req.body.id);
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};

const getNtdById = async (req, res) => {
  try {
    const data = await ntdService.getNtdById(req.query.id);
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};

module.exports = {
  getAllNtd,
  addNtd,
  updateNtd,
  deleteNtd,
  getNtdById,
};
