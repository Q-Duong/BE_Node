const mongoose = require("mongoose");
const abstractModel  = require("./AbstractModel");

const paymentSchema = new mongoose.Schema({
    ...abstractModel,
    type: {
        type: String,
        enum: ['InPerson', 'MoMo'],
        default: 'InPerson'
    },
    status: {
        type: String,
        enum: ['New','Success','Fail','Return'],
        default: 'New'
    },
    momoId: {
        type: Number,
        default: -1
    },
    exportOrder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "exportOrder"
    }
});

const payment = mongoose.model("payment", paymentSchema);

module.exports = payment;