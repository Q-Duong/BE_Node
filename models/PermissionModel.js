const mongoose = require("mongoose");
const {PERMISSION_TITLE_ENUM} = require('../constraint/permissionEnum')
const abstractModel  = require("./AbstractModel");

const permissionSchema = new mongoose.Schema({
    ...abstractModel,
    title: {
        type: String,
        required: true,
        unique: true,
        enum: PERMISSION_TITLE_ENUM
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