const mongoose = require("mongoose");
const abstractModel  = require("./AbstractModel");

const supplierSchema = new mongoose.Schema({
    ...abstractModel,
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    }]
});

const supplier = mongoose.model("supplier", supplierSchema);

module.exports = supplier;