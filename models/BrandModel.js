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
});

const brand = mongoose.model("brand", brandSchema);

module.exports = brand;