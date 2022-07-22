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

const newsCategory = mongoose.model("newsCategory", newsCaregorySchema);

module.exports = newsCategory;