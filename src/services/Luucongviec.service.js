const db = require("../models/index");

const getAllSavedJobs = async () => {
  try {
    const savedJobs = await db.Luucongviec.findAll({
      include: [
        { model: db.Tintuyendung, as: "TTD_LCV" },
        { model: db.Nguoitimviec, as: "NTV_LCV" },
      ],
    });
    return { status: 200, code: 0, message: "Success", data: savedJobs };
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: null };
  }
};

const getSavedJobById = async (id) => {
  try {
    const savedJob = await db.Luucongviec.findOne({
      where: { id },
      include: [
        { model: db.Tintuyendung, as: "TTD_LCV" },
        { model: db.Nguoitimviec, as: "NTV_LCV" },
      ],
    });
    return savedJob
      ? { status: 200, code: 0, message: "Success", data: savedJob }
      : { status: 404, code: 1, message: "Saved job not found", data: null };
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: null };
  }
};

const createSavedJob = async (data) => {
  try {
    const newSavedJob = await db.Luucongviec.create(data);
    return {
      status: 201,
      code: 0,
      message: "Saved job created",
      data: newSavedJob,
    };
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: null };
  }
};

const updateSavedJob = async (id, data) => {
  try {
    const updated = await db.Luucongviec.update(data, { where: { id } });
    return updated[0]
      ? { status: 200, code: 0, message: "Saved job updated", data: updated }
      : { status: 404, code: 1, message: "Saved job not found", data: null };
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: null };
  }
};

const deleteSavedJob = async (id) => {
  try {
    const deleted = await db.Luucongviec.destroy({ where: { id: id } });
    return deleted
      ? { status: 200, code: 0, message: "Saved job deleted", data: deleted }
      : { status: 404, code: 1, message: "Saved job not found", data: null };
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: null };
  }
};

module.exports = {
  getAllSavedJobs,
  getSavedJobById,
  createSavedJob,
  updateSavedJob,
  deleteSavedJob,
};
