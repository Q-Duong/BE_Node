const mongoose = require("mongoose");
const abstractModel  = require("./AbstractModel");

const warehouseSchema = new mongoose.Schema({
    ...abstractModel,
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "supplier",
    },
    soldQuantity: {
        type: Number,
        default: 0,
    },
    soldPrice: {
        type: Number,
        required: true,
    },
    stockQuantity: {
        type: Number,
        default: 0,
    },
    stockPrice: {
        type: Number,
        required: true,
    },
    active: {
        type: Boolean,
        default: true,
    },
    expireIn: {
        type: Date,
        required: true,
        default: Date.now,
    }
});

const warehouse = mongoose.model("warehouse", warehouseSchema);

module.exports = warehouse;