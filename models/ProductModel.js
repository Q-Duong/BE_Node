const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    unit: {
        type: String,
        required: true,
    },
    productImage: {
        type: String,
        required: true,
    },
    productStatus: {
        type: String,
        required: true,
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
    },
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "brand"
    }
});

const product = mongoose.model("product", productSchema);

module.exports = product;