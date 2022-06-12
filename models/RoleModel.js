const mongoose = require("mongoose");
const abstractModel  = require("./AbstractModel");

const roleSchema = new mongoose.Schema({
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
    permissions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "permission",
    }]
});

const permission = mongoose.model("permission", permissionSchema);

module.exports = permission;