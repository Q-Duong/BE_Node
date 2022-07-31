const mongoose = require("mongoose");
const abstractModel  = require("./AbstractModel");
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseArregatePaginate = require('mongoose-aggregate-paginate-v2');

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
    customerName: {
        type: String,
        min:1
    },
    customerPhone: {
        type: String,
        min:10
    },
    customerEmail: {
        type: String,
        min:3
    },
    details: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'exportOrderDetails'
    }]
});

exportOrderSchema.plugin(mongoosePaginate)
exportOrderSchema.plugin(mongooseArregatePaginate)
const exportOrder = mongoose.model("exportOrder", exportOrderSchema);

module.exports = exportOrder;