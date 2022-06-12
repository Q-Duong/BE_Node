const mongoose = require("mongoose");
const exportOrder = require("./ExportOrder");
const abstractModel  = require("./AbstractModel");

const paymentSchema = new mongoose.Schema({
    ...abstractModel,
    type: {
        type: String,
        enum: ['New','Success','Fail','Return']
    },
    momo: {
        type: Number,
        required: true,
    },
    exportOrderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "exportOrder"
    }
});

const payment = mongoose.model("payment", paymentSchema);

module.exports = payment;