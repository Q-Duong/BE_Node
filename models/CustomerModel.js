const mongoose = require("mongoose");
const  abstractUserModel  = require("./AbstractUserModel");

const customerSchema = new mongoose.Schema({
    ...abstractUserModel,
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
});

const customer = mongoose.model("customer", customerSchema);

module.exports = customer;