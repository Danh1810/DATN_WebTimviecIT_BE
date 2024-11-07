const db = require("../models/index");
const em = require("../services/Nhatd.service");
const getEmployersById = async (req, res) => {
  try {
    console.log("id", req.query.id);
    const response = await em.getEmployersById(req.query.id);

    console.log("res", response);
    if (response) {
      res.json({ status: 200, code: 0, message: "success", data: response });
    } else {
      res.json({ status: 500, code: 1, message: "fail", data: "" });
    }
  } catch (error) {
    res.json({ status: 500, code: -1, message: error.message, data: "" });
  }
};

module.exports = { getEmployersById };
