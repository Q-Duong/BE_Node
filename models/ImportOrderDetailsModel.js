const mongoose = require("mongoose");
const abstractModel  = require("./AbstractModel");

const importOrderDetailsSchema = new mongoose.Schema({
    ...abstractModel,
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    },
    productQuantity: {
        type: Number,
        required: true,
    },
    productPrice: {
        type: Number,
        required: true,
    },
    
});

const importOrderDetails = mongoose.model("importOrderDetails", importOrderDetailsSchema);

module.exports = importOrderDetails;