const mongoose = require("mongoose");
const abstractModel  = require("./AbstractModel");

const brandSchema = new mongoose.Schema({
    ...abstractModel,
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
});

const brand = mongoose.model("brand", brandSchema);

module.exports = brand;