const mongoose = require("mongoose");
const abstractModel  = require("./AbstractModel");

const categorySchema = new mongoose.Schema({
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

const category = mongoose.model("category", categorySchema);

module.exports = category;