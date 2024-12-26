const express = require("express");
const router = express.Router();
const tintdController = require("../controller/TintdController");

// Route to get all job posts
// router.get("/", tintdController.getAllTintd);

// Route to get a job post by ID
// router.get("/:id", tintdController.getTintdByID);

// Route to get TTD data
router.get("/", tintdController.getAllTintd);
router.get("/admin", tintdController.getAllTintdadmin);
router.get("/cd", tintdController.getAllTintdcd);
router.get("/ntd", tintdController.getTtdntdId);
router.get("/ntd/detail", tintdController.getTtdntdIddetail);

// Route to add a new TTD
router.post("/", tintdController.addJobPostWithDetails);
router.get("/tk", tintdController.searchJobPostsByKeyword);
router.post("/duyet", tintdController.updateTrangthaiService);
router.post("/tuchoi", tintdController.updateTrangthaiServicetc);
router.post("/update-expired-jobs", tintdController.updateExpiredJobs);

// Route to delete a TTD by ID
router.delete("/", tintdController.delTtd);

// Route to get TTD by ID
router.get("/details", tintdController.getTtdById);

// Route to update a TTD
router.put("/update", tintdController.updateTtd);

module.exports = router;
