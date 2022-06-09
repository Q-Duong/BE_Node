const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    employeeName: {
        type: String,
        required: true,
    },
    employeePhone: {
        type: String,
        required: true,
    },
    employeeEmail: {
        type: String,
        required: true,
    },
    employeePassword: {
        type: String,
        required: true,
    },
    employeeRole: {
        type: String,
        enum: ['Manager','Staff','President','Admin']
    },
    employeeActive: {
        type: Boolean,
        required: true,
    },
});

const employee = mongoose.model("employee", employeeSchema);

module.exports = employee;