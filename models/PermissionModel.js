const mongoose = require("mongoose");
const abstractModel  = require("./AbstractModel");

const permissionSchema = new mongoose.Schema({
    ...abstractModel,
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
    active: {
        type: Boolean,
        default: true,
    },
});

const permission = mongoose.model("permission", permissionSchema);

module.exports = permission;