const LuuhosoService = require("../services/luuhoso");
const db = require("../models/index");

const getSavedProfiles = async (req, res) => {
  try {
    const data = await LuuhosoService.getAllSavedProfiles();
    return res.status(data.status).json(data);
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, code: -1, message: error.message });
  }
};

const getSavedProfileById = async (req, res) => {
  try {
    const data = await LuuhosoService.getSavedProfileById(req.params.id);
    return res.status(data.status).json(data);
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, code: -1, message: error.message });
  }
};
const getSavedProfilesByEmployerId = async (req, res) => {
  try {
    const data1 = await db.Nhatuyendung.findOne({
      where: { MaND: req.query.id },
    });
    console.log("🚀 ~ getSavedProfilesByEmployerId ~ data1:", data1);
    console.log(
      "🚀 ~ getSavedProfilesByEmployerId ~ req.query.id:",
      req.query.id
    );

    const data = await LuuhosoService.getSavedProfilesByEmployerId(data1.id);
    return res.status(data.status).json(data);
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, code: -1, message: error.message });
  }
};

const addSavedProfile = async (req, res) => {
  try {
    const { Userid, MaHS } = req.body;
    console.log("🚀 ~ addSavedJob ~ req.body:", req.body);
    const employer = await db.Nhatuyendung.findOne({
      where: { MaND: Userid },
    });
    const MaNTD = employer.id;

    // Create the saved profile
    const data = await LuuhosoService.createSavedProfile({ MaNTD, MaHS });
    return res.status(data.status).json(data);
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, code: -1, message: error.message });
  }
};

const updateSavedProfile = async (req, res) => {
  try {
    const data = await LuuhosoService.updateSavedProfile(
      req.params.id,
      req.body
    );
    return res.status(data.status).json(data);
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, code: -1, message: error.message });
  }
};

const deleteSavedProfile = async (req, res) => {
  try {
    const data = await LuuhosoService.deleteSavedProfile(req.query.id);
    return res.status(data.status).json(data);
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, code: -1, message: error.message });
  }
};

module.exports = {
  getSavedProfiles,
  getSavedProfileById,
  addSavedProfile,
  updateSavedProfile,
  deleteSavedProfile,
  getSavedProfilesByEmployerId,
};
