const mongoose = require("mongoose");
const abstractUserModel =  require("./AbstractUserModel");
const mongoosePaginate = require('mongoose-paginate-v2');

const employeeSchema = new mongoose.Schema({
    ...abstractUserModel,
    phone: {
        type: String,
        required: true,
    }
});

employeeSchema.plugin(mongoosePaginate)
const employee = mongoose.model("employee", employeeSchema);

module.exports = employee;