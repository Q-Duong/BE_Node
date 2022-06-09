const mongoose = require("mongoose");

const importOrderSchema = new mongoose.Schema({
    createAt: {
        type: Date,
        default: Date.now,
    },
    total: {
        type: double,
        required: true,
    },
    duration: {
        type: Number,
       
    },
    loan: {
        type: double,
        
    },
    importOrderStatus: {
        type: String,
        enum: ['Paid','Debt']
    },
    supplierId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "supplier"
    },
    importOrderDetails: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "importOrderDetails"
    }],
});

const importOrder = mongoose.model("importOrder", importOrderSchema);

module.exports = importOrder;