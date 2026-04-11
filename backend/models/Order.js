const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  items: Array,
  total: Number,
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);