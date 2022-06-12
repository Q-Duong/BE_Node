const mongoose = require("mongoose");
const abstractModel  = require("./AbstractModel");

const categorySchema = new mongoose.Schema({
    ...abstractModel,
    categoryName: {
        type: String,
        required: true,
    },
    categoryImage: {
        type: String,
        required: true,
    },
});

const category = mongoose.model("category", categorySchema);

module.exports = category;