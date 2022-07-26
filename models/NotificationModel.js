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
    type: {
        type: String,
        enum: ['OUT_OF_STOCK','EXPIRE']
    },
    warehouse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'warehouse'
    }
})

const notification = mongoose.model("notification", notificationSchema)

module.exports = notification