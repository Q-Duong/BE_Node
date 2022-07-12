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
        ref: 'supplier'
    },
    soldQuantity: {
        type: Number,
        default: 0,
    },
    soldPrice: {
        type: Number,
        default: 0        
    },
    stockQuantity: {
        type: Number,
        default: 0,
    },
    stockPrice: {
        type: Number,
        default: 0
    },
    manufacturingDate: {
        type: Date,
        default: Date.now
    },
    expireIn: {
        type: Date,
        default: Date.now,
    }
});

const warehouse = mongoose.model("warehouse", warehouseSchema);

module.exports = warehouse;