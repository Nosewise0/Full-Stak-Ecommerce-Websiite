const { time } = require("console");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: Number,
  name: {type: String, required: true},
  title: String,
  description: String,
  price: Number,
  image: String,
  category: String,
  stock: Number,
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
