const UTService = require("../services/Ungtuyen.service");
const db = require("../models/index");
const getUT = async (req, res) => {
  try {
    const data = await UTService.getAllUT();
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const getUTlayhoso = async (req, res) => {
  try {
    const data = await UTService.layTatCaHSTheoTTD(req.query.id);
    console.log("🚀 ~ getUTlayhoso ~ req.query.id:", req.query.id);
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const getUTNTV = async (req, res) => {
  try {
    const id = req.query.id;
    const NTV = await db.Nguoitimviec.findOne({
      where: { MaND: id },
    });
    const data = await UTService.layTatCaHSTheoNTV(NTV.id);
    console.log("🚀 ~ getUTlayhoso ~ req.query.id:", req.query.id);
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const addUT = async (req, res) => {
  try {
    const { MaTTD, MaHS } = req.body;
    const newApplication = {
      MaTTD,
      MaHS,
      NgayNop: new Date(),
    };

    // Lưu thông tin đơn ứng tuyển vào database
    await UTService.createUT(newApplication);

    res.status(201).json({ message: "Application submitted successfully!" });
  } catch (error) {
    console.error("Error submitting application:", error);
    res.status(500).json({ message: "Error submitting application" });
  }
};
const delUT = async (req, res) => {
  try {
    const data = await UTService.delUT(req.body);
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const getUTById = async (req, res) => {
  try {
    const data = await UTService.getUTById(req.query.id);
    return res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {}
};
const updateUT = async (req, res) => {
  try {
    const data = await UTService.updateUT(req.body);
    return res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {}
};
const { Op, Sequelize } = require("sequelize");

const getMonthlyApplications = async (maNTD) => {
  try {
    // Get all applications for jobs posted by this employer
    const monthlyStats = await db.Ungtuyen.findAll({
      attributes: [
        [
          Sequelize.fn("DATE_FORMAT", Sequelize.col("NgayNop"), "%Y-%m"),
          "month",
        ],
        [Sequelize.fn("COUNT", "*"), "applicationCount"],
      ],
      include: [
        {
          model: db.Tintuyendung,
          as: "UT_TTD",
          attributes: [],
          required: true,
          include: [
            {
              model: db.Nhatuyendung,
              as: "employer",
              attributes: [],
              where: { MaND: maNTD },
              required: true,
            },
          ],
        },
      ],
      group: [Sequelize.fn("DATE_FORMAT", Sequelize.col("NgayNop"), "%Y-%m")],
      order: [
        [
          Sequelize.fn("DATE_FORMAT", Sequelize.col("NgayNop"), "%Y-%m"),
          "DESC",
        ],
      ],
      raw: true,
    });

    // Format the response
    const formattedStats = monthlyStats.map((stat) => ({
      month: stat.month,
      slhoso: parseInt(stat.applicationCount),
    }));

    return {
      success: true,
      data: formattedStats,
    };
  } catch (error) {
    console.error("Error getting monthly applications:", error);
    return {
      success: false,
      error: "Failed to get monthly applications statistics",
    };
  }
};

// Express route handler
const getMonthlyApplicationsStats = async (req, res) => {
  const maNTD = req.query.id;
  console.log("🚀 ~ getMonthlyApplicationsStats ~ maNTD:", maNTD);

  if (!maNTD) {
    return res.status(400).json({
      success: false,
      error: "Employer ID is required",
    });
  }

  const result = await getMonthlyApplications(maNTD);

  if (!result.success) {
    return res.status(500).json(result);
  }

  res.json(result);
};

module.exports = {
  getUT,
  addUT,
  delUT,
  getUTById,
  updateUT,
  getUTlayhoso,
  getUTNTV,
  getMonthlyApplicationsStats,
};
