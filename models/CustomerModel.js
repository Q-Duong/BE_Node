const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true,
    },
    customerPhone: {
        type: String,
        required: true,
    },
    customerAddress: {
        type: String,
        required: true,
    },
    customerEmail: {
        type: String,
        required: true,
    },
    customerPassword: {
        type: String,
        required: true,
    },
    customerActive: {
        type: Boolean,
        required: true,
    },
});

const customer = mongoose.model("customer", customerSchema);

module.exports = customer;