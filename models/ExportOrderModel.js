const mongoose = require("mongoose");
const abstractModel  = require("./AbstractModel");

const exportOrderSchema = new mongoose.Schema({
    ...abstractModel,
    totalBill: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['New','Paid','Cancle']
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employee"
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customer"
    },
});

const exportOrder = mongoose.model("exportOrder", exportOrderSchema);

module.exports = exportOrder;