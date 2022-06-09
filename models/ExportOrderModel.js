const mongoose = require("mongoose");

const exportOrderSchema = new mongoose.Schema({
    createAt: {
        type: Date,
        default: Date.now,
    },
    total: {
        type: double,
        required: true,
    },
    exportOrderStatus: {
        type: String,
        enum: ['New','Paid','Cancle']
    },
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employee"
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customer"
    },
});

const exportOrder = mongoose.model("exportOrder", exportOrderSchema);

module.exports = exportOrder;