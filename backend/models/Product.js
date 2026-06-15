const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    price: Number,
    supplier: String
});

module.exports = mongoose.model("Product", productSchema);