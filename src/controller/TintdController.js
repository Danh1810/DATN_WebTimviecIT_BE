const jbpservice = require("../services/Tintd.service");
const db = require("../models/index");

const getJobpost = async (req, res) => {
  try {
    const data = await jbpservice.getAllJobpost();
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const getJobpostByID = async (req, res) => {
  try {
    const data = await jbpservice.getJobpostByID(req.body.id);
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const searchJobPostsByKeyword = async (req, res) => {
  // const keyword =req.body.keyword
  // console.log("jdjsa",keyword)
  // if (!keyword) {
  //   return res.status(400).json({ message: 'Keyword is required' });
  // }
  // try {
  //   const data = await jbpservice.searchJobPostsByKeyword(keyword);
  //   res
  //     .status(data.status)
  //     .json({ code: data.code, message: data.message, data: data.data });
  // } catch (error) {
  //   return res.status(500).json({ message: error.message, code: -1, data: "" });
  // }
  try {
    const { email } = req.body;

    // Create a new job seeker entry
    const newJobSeeker = await db.Nguoitimviec.create({
      email,
    });

    // Manually assign the custom ID
    newJobSeeker.id = `NTV${newJobSeeker.numericId
      .toString()
      .padStart(6, "0")}`;
    await newJobSeeker.save();

    return res.status(201).json({
      success: true,
      data: newJobSeeker,
      message: "Job seeker added successfully!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while adding the job seeker.",
    });
  }
};

module.exports = { getJobpost, getJobpostByID, searchJobPostsByKeyword };
