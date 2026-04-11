const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post("/create-order", async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);

    const amount = Number(req.body.amount);

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
    });

    return res.status(200).json(order);

  } catch (error) {
    console.log("🔥 FULL ERROR:", error); // 👈 VERY IMPORTANT
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
});

module.exports = router;