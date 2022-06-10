const mongoose = require("mongoose");

const exportOrderDetailsSchema = new mongoose.Schema({
    productSupplierId: {
        type: Number,
        required: true,
        unique: true,
    },
    productName: {
        type: String,
        required: true,
    },
    productQuantity: {
        type: Number,
        required: true,
    },
    productPrice: {
        type: double,
        required: true,
    },
    Unit: {
        type: String,
        required: true,
    },
});

const exportOrderDetails = mongoose.model("exportOrderDetails", exportOrderDetailsSchema);

module.exports = exportOrderDetails;