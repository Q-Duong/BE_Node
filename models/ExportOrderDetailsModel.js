const mongoose = require("mongoose");
const abstractModel  = require("./AbstractModel");

const exportOrderDetailsSchema = new mongoose.Schema({
    ...abstractModel,
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    },
    productPrice: {
        type: Number,
        required: true,
    },
    productQuantity: {
        type: Number,
        required: true,
    },
});

const exportOrderDetails = mongoose.model("exportOrderDetails", exportOrderDetailsSchema);

module.exports = exportOrderDetails;