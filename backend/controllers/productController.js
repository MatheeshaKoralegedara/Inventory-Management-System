const Product = require("../models/Product");

// Add product
exports.addProduct = async (req, res) => {
    const product = await Product.create(req.body);
    res.json(product);
};

// Get all products
exports.getProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products);
};

// Update stock
exports.updateStock = async (req, res) => {
    const product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(product);
};

// Delete product
exports.deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
};