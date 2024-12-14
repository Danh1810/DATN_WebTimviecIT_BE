const express = require("express");
const router = express.Router();
const LsttController = require("../controller/Lstt.controller");

// Define routes for LSTT (Payment History)
router.get("/", LsttController.getLstt); // Get all payment histories
router.post("/", LsttController.addLstt); // Add new payment history
router.delete("/", LsttController.delLstt); // Delete payment history by ID
router.get("/group", LsttController.getLsttByGroup); // Get payment history by group ID
router.get("/detail", LsttController.getRoleById); // Get role by ID
router.put("/", LsttController.updateLSTT);
router.post("/create", LsttController.create),
  router.post("/callback", LsttController.callback);
router.get("/ntd", LsttController.getLsttByNTDId);
module.exports = router;
