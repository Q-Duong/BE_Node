const abstractModel = require("./AbstractModel");
const mongoose = require("mongoose");

const abstractUserModel = {
    ...abstractModel,
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        min:5
    },
    password: {
        type: String,
        required: true,
        min: 4
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "role",
    } 
}

module.exports = abstractUserModel;