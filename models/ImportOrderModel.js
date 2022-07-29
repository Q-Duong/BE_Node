const mongoose = require("mongoose");
const abstractModel  = require("./AbstractModel");
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseArregatePaginate = require('mongoose-aggregate-paginate-v2');

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

importOrderSchema.plugin(mongoosePaginate)
importOrderSchema.plugin(mongooseArregatePaginate)
const importOrder = mongoose.model("importOrder", importOrderSchema);

module.exports = importOrder;