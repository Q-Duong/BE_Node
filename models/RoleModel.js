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
    permissions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "permission",
    }]
});

const role = mongoose.model("role", roleSchema);

module.exports = role;