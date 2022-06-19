const mongoose = require("mongoose");
const abstractModel  = require("./AbstractModel");

const importOrderSchema = new mongoose.Schema({
    ...abstractModel,
    totalBill: {
        type: Number,
        required: true,
    },
    duration: {
        type: Number,
        default: 0
    },
    loan: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: ['Paid','Debt']
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "supplier"
    },
    details: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "importOrderDetails"
    }],
});

const importOrder = mongoose.model("importOrder", importOrderSchema);

module.exports = importOrder;