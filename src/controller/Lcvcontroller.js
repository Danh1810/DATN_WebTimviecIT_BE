const LuucongviecService = require("../services/Luucongviec.service");
const db = require("../models/index");
const getSavedJobs = async (req, res) => {
  const data = await LuucongviecService.getAllSavedJobs();
  return res.status(data.status).json(data);
};

const getSavedJobById = async (req, res) => {
  const data = await LuucongviecService.getSavedJobById(req.params.id);
  return res.status(data.status).json(data);
};

const addSavedJob = async (req, res) => {
  const { Userid, MaTTD } = req.body;
  console.log("🚀 ~ addSavedJob ~ req.body:", req.body);
  const employer = await db.Nguoitimviec.findOne({
    where: { MaND: Userid },
  });

  const data = await LuucongviecService.createSavedJob({
    MaTTD: MaTTD,
    MaNTV: employer.id,
  });
  return res.status(data.status).json(data);
};

const updateSavedJob = async (req, res) => {
  const data = await LuucongviecService.updateSavedJob(req.params.id, req.body);
  return res.status(data.status).json(data);
};

const deleteSavedJob = async (req, res) => {
  const data = await LuucongviecService.deleteSavedJob(req.query.id);
  return res.status(data.status).json(data);
};

module.exports = {
  getSavedJobs,
  getSavedJobById,
  addSavedJob,
  updateSavedJob,
  deleteSavedJob,
};
