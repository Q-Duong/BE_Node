const mongoose = require('mongoose')
const abstractModel = require('./AbstractModel')

const notificationSchema = new mongoose.Schema({
    ...abstractModel,
    isRead: {
        type: Boolean,
        default: false
    },
    content: {
        type: String,
        require: true
    },
    warehouse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'warehouse',
        unique: true
    }
})

const notification = mongoose.model("notification", notificationSchema)

module.exports = notification