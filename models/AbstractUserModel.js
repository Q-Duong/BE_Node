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
    },
    password: {
        type: String,
        required: true,
    },
    // role: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "role",
    // },
    active: {
        type: Boolean,
        default: true,
    },
}

module.exports = abstractUserModel;