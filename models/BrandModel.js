const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
    brandName: {
        type: String,
        required: true,
    },
    brandImage: {
        type: String,
        required: true,
    },
}, { versionKey: '_somethingElse' });

const brand = mongoose.model("brand", brandSchema);

module.exports = brand;