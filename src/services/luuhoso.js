const db = require("../models/index");

const getAllSavedProfiles = async () => {
  try {
    const savedProfiles = await db.Luuhoso.findAll({
      include: [
        { model: db.Nhatuyendung, as: "NTD_LHS" },
        { model: db.Hosocanhan, as: "HS_LHS" },
      ],
    });
    return { status: 200, code: 0, message: "Success", data: savedProfiles };
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: null };
  }
};

const getSavedProfileById = async (id) => {
  try {
    const savedProfile = await db.Luuhoso.findOne({
      where: { id },
      include: [
        { model: db.Nhatuyendung, as: "NTD_LHS" },
        { model: db.Hosocanhan, as: "HS_LHS" },
      ],
    });
    return savedProfile
      ? { status: 200, code: 0, message: "Success", data: savedProfile }
      : {
          status: 404,
          code: 1,
          message: "Saved profile not found",
          data: null,
        };
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: null };
  }
};

const createSavedProfile = async (data) => {
  try {
    const newSavedProfile = await db.Luuhoso.create(data);
    return {
      status: 201,
      code: 0,
      message: "Saved profile created",
      data: newSavedProfile,
    };
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: null };
  }
};
const getSavedProfilesByEmployerId = async (MaNTD) => {
  console.log("🚀 ~ getSavedProfilesByEmployerId ~ MaNTD:", MaNTD);
  try {
    const savedProfiles = await db.Luuhoso.findAll({
      where: { MaNTD },
      include: [{ model: db.Hosocanhan, as: "HS_LHS" }],
    });
    return savedProfiles.length > 0
      ? { status: 200, code: 0, message: "Success", data: savedProfiles }
      : {
          status: 404,
          code: 1,
          message: "No saved profiles found",
          data: null,
        };
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: null };
  }
};

const updateSavedProfile = async (id, data) => {
  try {
    const updated = await db.Luuhoso.update(data, { where: { id } });
    return updated[0]
      ? {
          status: 200,
          code: 0,
          message: "Saved profile updated",
          data: updated,
        }
      : {
          status: 404,
          code: 1,
          message: "Saved profile not found",
          data: null,
        };
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: null };
  }
};

const deleteSavedProfile = async (id) => {
  try {
    const deleted = await db.Luuhoso.destroy({ where: { id } });
    return deleted
      ? {
          status: 200,
          code: 0,
          message: "Saved profile deleted",
          data: deleted,
        }
      : {
          status: 404,
          code: 1,
          message: "Saved profile not found",
          data: null,
        };
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: null };
  }
};

module.exports = {
  getAllSavedProfiles,
  getSavedProfileById,
  createSavedProfile,
  updateSavedProfile,
  deleteSavedProfile,
  getSavedProfilesByEmployerId,
};
