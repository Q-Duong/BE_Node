const mongoose = require("mongoose");
const abstractModel  = require("./AbstractModel");

const exportOrderSchema = new mongoose.Schema({
    ...abstractModel,
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