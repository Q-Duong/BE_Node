const mongoose = require("mongoose");
const abstractModel  = require("./AbstractModel");
const mongoosePaginate = require('mongoose-paginate-v2')

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

categorySchema.plugin(mongoosePaginate)
const category = mongoose.model("category", categorySchema);

module.exports = category;