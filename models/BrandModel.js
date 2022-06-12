const mongoose = require("mongoose");
const abstractModel  = require("./AbstractModel");

const brandSchema = new mongoose.Schema({
    ...abstractModel,
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