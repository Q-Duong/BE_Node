const mongoose = require("mongoose");
const abstractModel  = require("./AbstractModel");

const exportOrderSchema = new mongoose.Schema({
    ...abstractModel,
    totalBill: {
        type: Number,
        required: true,
    },
    shipAddress: {
        type: String,
        required: true
    },
    shippedDate: {
        type: Date
    },
    status: {
        type: String,
        enum: ['New','Paid','Cancle'],
        default: "New"
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employee"
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customer"
    },
    details: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'exportOrderDetails'
    }]
});

const exportOrder = mongoose.model("exportOrder", exportOrderSchema);

module.exports = exportOrder;