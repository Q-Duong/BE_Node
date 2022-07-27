const mongoose = require("mongoose");
const abstractModel  = require("./AbstractModel");
const mongoosePaginate = require('mongoose-paginate-v2');

const productSchema = new mongoose.Schema({
    ...abstractModel,
    name: {
        type: String,
        required: true,
    },
    unit: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "brand"
    },
});

productSchema.plugin(mongoosePaginate)
const product = mongoose.model("product", productSchema);

module.exports = product;