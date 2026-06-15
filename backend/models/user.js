const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, unique: true, sparse: true},
    email: { type: String, unique: true },
    password: String,
    role: { type: String, default: "user" }
});

module.exports = mongoose.model("User", userSchema);