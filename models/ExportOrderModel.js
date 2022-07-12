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
        enum: ['Đơn hàng mới/CTT','Đơn hàng mới/ĐTT','Đã thanh toán','Hủy','Đã Giao Hàng'],
        default: "Đơn hàng mới/CTT"
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employee",
        default: '629ef3d6a8dd7a3001491a7b'
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