const mongoose = require("mongoose");
const abstractModel  = require("./AbstractModel");
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseArregatePaginate = require('mongoose-aggregate-paginate-v2');

const supplierSchema = new mongoose.Schema({
    ...abstractModel,
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    }]
});

supplierSchema.plugin(mongoosePaginate)
supplierSchema.plugin(mongooseArregatePaginate)
const supplier = mongoose.model("supplier", supplierSchema);

module.exports = supplier;