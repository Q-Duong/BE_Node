const mongoose = require("mongoose");
const abstractUserModel =  require("./AbstractUserModel");
const employeeSchema = new mongoose.Schema({
    ...abstractUserModel,
    phone: {
        type: String,
        required: true,
    },
});

const employee = mongoose.model("employee", employeeSchema);

module.exports = employee;