const mongoose = require("mongoose");
const  abstractUserModel  = require("./AbstractUserModel");
const mongoosePaginate = require('mongoose-paginate-v2')

const customerSchema = new mongoose.Schema({
    ...abstractUserModel,
    phone: {
        type: String,
        unique: true,
        required: true,
        min: 10
    },
    address: {
        type: String,
    },
});
customerSchema.plugin(mongoosePaginate)
const customer = mongoose.model("customer", customerSchema);

module.exports = customer;