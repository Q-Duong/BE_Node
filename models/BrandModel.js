const mongoose = require("mongoose");
const abstractModel  = require("./AbstractModel");
const mongoosePaginate = require('mongoose-paginate-v2');

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
brandSchema.plugin(mongoosePaginate)
const brand = mongoose.model("brand", brandSchema);

module.exports = brand;