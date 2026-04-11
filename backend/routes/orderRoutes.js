const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// Create Order
router.post("/", async (req, res) => {
  try {
    const order = await Order.create({
      items: req.body.items,
      total: req.body.total,
    });

    res.json(order);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;