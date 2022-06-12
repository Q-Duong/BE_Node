const mongoose = require("mongoose");
const abstractModel  = require("./AbstractModel");

const supplierSchema = new mongoose.Schema({
    ...abstractModel,
    supplierName: {
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
});

const supplier = mongoose.model("supplier", supplierSchema);

module.exports = supplier;