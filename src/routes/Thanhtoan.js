const express = require("express");
const router = express.Router();
const thanhtoanController = require("../controller/thanhtoan.controller");

// Define routes for Payment (Thanh Toan)
router.get("/", thanhtoanController.getTT); // Get all payments
router.post("/", thanhtoanController.addTT); // Add a new payment
router.delete("/", thanhtoanController.delTT); // Delete a payment
router.get("/:id", thanhtoanController.getttById); // Get payment by ID
router.put("/", thanhtoanController.updateTT); // Update payment

module.exports = router;
