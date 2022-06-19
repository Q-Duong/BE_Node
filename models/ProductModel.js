const mongoose = require("mongoose");
const abstractModel  = require("./AbstractModel");

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
    expireNumber: {
        type: Number,
        default: 1
    },
    expireUnit: {
        type: String,
        enum: ['day', 'month', 'year']
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

const product = mongoose.model("product", productSchema);

module.exports = product;