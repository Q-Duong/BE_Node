const mongoose = require("mongoose");
const abstractModel  = require("./AbstractModel");

const importOrderDetailsSchema = new mongoose.Schema({
    ...abstractModel,
    productSupplierId: {
        type: Number,
        required: true,
        unique: true,
    },
    productQuantity: {
        type: Number,
        required: true,
    },
    productPrice: {
        type: double,
        required: true,
    },
    
});

const importOrderDetails = mongoose.model("importOrderDetails", importOrderDetailsSchema);

module.exports = importOrderDetails;