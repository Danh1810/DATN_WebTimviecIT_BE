const LuucongviecService = require("../services/Luucongviec.service");

const getSavedJobs = async (req, res) => {
  const data = await LuucongviecService.getAllSavedJobs();
  return res.status(data.status).json(data);
};

const getSavedJobById = async (req, res) => {
  const data = await LuucongviecService.getSavedJobById(req.params.id);
  return res.status(data.status).json(data);
};

const addSavedJob = async (req, res) => {
  const data = await LuucongviecService.createSavedJob(req.body);
  return res.status(data.status).json(data);
};

const updateSavedJob = async (req, res) => {
  const data = await LuucongviecService.updateSavedJob(req.params.id, req.body);
  return res.status(data.status).json(data);
};

const deleteSavedJob = async (req, res) => {
  const data = await LuucongviecService.deleteSavedJob(req.params.id);
  return res.status(data.status).json(data);
};

module.exports = {
  getSavedJobs,
  getSavedJobById,
  addSavedJob,
  updateSavedJob,
  deleteSavedJob,
};
